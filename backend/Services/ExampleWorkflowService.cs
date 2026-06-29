using System.Text.Json;
using System.Text.Json.Nodes;
using DxNavigator.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace DxNavigator.Api.Services;

public sealed class ExampleWorkflowService
{
    private const string DefaultLocale = "en";
    private readonly ApplicationDbContext dbContext;
    private readonly IWebHostEnvironment environment;

    public ExampleWorkflowService(
        ApplicationDbContext dbContext,
        IWebHostEnvironment environment)
    {
        this.dbContext = dbContext;
        this.environment = environment;
    }

    public async Task SeedExamplesAsync()
    {
        var seedPath = Path.Combine(environment.ContentRootPath, "SeedData", "example-workflows.json");

        if (!File.Exists(seedPath))
        {
            return;
        }

        var json = await File.ReadAllTextAsync(seedPath);
        var seedWorkflows = JsonSerializer.Deserialize<List<ExampleWorkflowSeed>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
        }) ?? [];

        foreach (var seedWorkflow in seedWorkflows)
        {
            var locale = await dbContext.Locales.SingleOrDefaultAsync(locale =>
                locale.Code == seedWorkflow.Language &&
                locale.IsActive);

            if (locale is null)
            {
                continue;
            }

            var normalizedSeed = NormalizeSeedWorkflow(seedWorkflow.Definition);
            var workflow = await dbContext.ExampleWorkflows
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(workflow => workflow.Key == seedWorkflow.Key);
            var now = DateTimeOffset.UtcNow;

            if (workflow is null)
            {
                workflow = new ExampleWorkflow
                {
                    Key = seedWorkflow.Key,
                    LocaleId = locale.Id,
                    Title = seedWorkflow.Title,
                    Description = seedWorkflow.Description,
                    Slug = seedWorkflow.Slug,
                    DisplayOrder = seedWorkflow.DisplayOrder,
                    Definition = normalizedSeed.Definition,
                    CreatedAt = now,
                    UpdatedAt = now,
                };
                dbContext.ExampleWorkflows.Add(workflow);
            }
            else
            {
                workflow.LocaleId = locale.Id;
                workflow.Title = seedWorkflow.Title;
                workflow.Description = seedWorkflow.Description;
                workflow.Slug = seedWorkflow.Slug;
                workflow.DisplayOrder = seedWorkflow.DisplayOrder;
                workflow.Definition = normalizedSeed.Definition;
                workflow.UpdatedAt = now;
                workflow.DeletedAt = null;
            }

            await dbContext.SaveChangesAsync();

            await dbContext.ExampleWorkflowPresets
                .Where(preset => preset.ExampleWorkflowId == workflow.Id)
                .ExecuteDeleteAsync();

            foreach (var preset in normalizedSeed.Presets)
            {
                dbContext.ExampleWorkflowPresets.Add(new ExampleWorkflowPreset
                {
                    ExampleWorkflowId = workflow.Id,
                    Title = preset.Title,
                    Description = preset.Description,
                    Answers = JsonDocument.Parse(preset.Answers.RootElement.GetRawText()),
                    DisplayOrder = preset.DisplayOrder,
                    CreatedAt = now,
                    UpdatedAt = now,
                });
            }
        }

        await dbContext.SaveChangesAsync();
    }

    public async Task CopyExamplesToUserIfEmptyAsync(int userId, string? preferredLocale)
    {
        var hasWorkflows = await dbContext.UserWorkflows.AnyAsync(workflow => workflow.UserId == userId);

        if (hasWorkflows)
        {
            return;
        }

        var localeCode = await ResolveLocaleCodeAsync(preferredLocale);
        var examples = await dbContext.ExampleWorkflows
            .Include(workflow => workflow.Locale)
            .Include(workflow => workflow.Presets)
            .Where(workflow => workflow.Locale!.Code == localeCode)
            .OrderBy(workflow => workflow.DisplayOrder)
            .ToListAsync();

        if (examples.Count == 0 && localeCode != DefaultLocale)
        {
            examples = await dbContext.ExampleWorkflows
                .Include(workflow => workflow.Locale)
                .Include(workflow => workflow.Presets)
                .Where(workflow => workflow.Locale!.Code == DefaultLocale)
                .OrderBy(workflow => workflow.DisplayOrder)
                .ToListAsync();
        }

        var now = DateTimeOffset.UtcNow;

        foreach (var example in examples)
        {
            var userWorkflow = new UserWorkflow
            {
                UserId = userId,
                LocaleId = example.LocaleId,
                Title = example.Title,
                Description = example.Description,
                Slug = example.Slug,
                DisplayOrder = example.DisplayOrder,
                Definition = JsonDocument.Parse(example.Definition.RootElement.GetRawText()),
                CreatedAt = now,
                UpdatedAt = now,
            };

            dbContext.UserWorkflows.Add(userWorkflow);
            await dbContext.SaveChangesAsync();

            foreach (var preset in example.Presets.OrderBy(preset => preset.DisplayOrder))
            {
                dbContext.UserWorkflowPresets.Add(new UserWorkflowPreset
                {
                    UserWorkflowId = userWorkflow.Id,
                    Title = preset.Title,
                    Description = preset.Description,
                    Answers = JsonDocument.Parse(preset.Answers.RootElement.GetRawText()),
                    DisplayOrder = preset.DisplayOrder,
                    CreatedAt = now,
                    UpdatedAt = now,
                });
            }
        }

        await dbContext.SaveChangesAsync();
    }

    private async Task<string> ResolveLocaleCodeAsync(string? preferredLocale)
    {
        if (!string.IsNullOrWhiteSpace(preferredLocale) &&
            await dbContext.Locales.AnyAsync(locale => locale.Code == preferredLocale && locale.IsActive))
        {
            return preferredLocale;
        }

        return DefaultLocale;
    }

    private sealed record ExampleWorkflowSeed(
        string Key,
        string Title,
        string? Description,
        string Slug,
        string Language,
        int DisplayOrder,
        JsonElement Definition);

    private static NormalizedSeedWorkflow NormalizeSeedWorkflow(JsonElement definition)
    {
        var node = JsonNode.Parse(definition.GetRawText()) as JsonObject ?? new JsonObject();
        var presets = new List<SeedPreset>();

        if (node.TryGetPropertyValue("presets", out var presetsNode) &&
            presetsNode is JsonArray presetArray)
        {
            for (var index = 0; index < presetArray.Count; index += 1)
            {
                if (presetArray[index] is not JsonObject presetObject)
                {
                    continue;
                }

                var title = presetObject["title"]?.GetValue<string>()?.Trim();

                if (string.IsNullOrWhiteSpace(title))
                {
                    continue;
                }

                if (presetObject["answers"] is not JsonObject answersObject)
                {
                    continue;
                }

                presets.Add(new SeedPreset(
                    title,
                    presetObject["description"]?.GetValue<string>(),
                    JsonDocument.Parse(answersObject.ToJsonString()),
                    index));
            }

            node.Remove("presets");
        }

        return new NormalizedSeedWorkflow(
            JsonDocument.Parse(node.ToJsonString()),
            presets);
    }

    private sealed record NormalizedSeedWorkflow(
        JsonDocument Definition,
        IReadOnlyList<SeedPreset> Presets);

    private sealed record SeedPreset(
        string Title,
        string? Description,
        JsonDocument Answers,
        int DisplayOrder);
}
