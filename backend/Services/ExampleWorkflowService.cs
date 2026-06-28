using System.Text.Json;
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

            var workflow = await dbContext.ExampleWorkflows
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(workflow => workflow.Key == seedWorkflow.Key);
            var now = DateTimeOffset.UtcNow;

            if (workflow is null)
            {
                dbContext.ExampleWorkflows.Add(new ExampleWorkflow
                {
                    Key = seedWorkflow.Key,
                    LocaleId = locale.Id,
                    Title = seedWorkflow.Title,
                    Description = seedWorkflow.Description,
                    Slug = seedWorkflow.Slug,
                    DisplayOrder = seedWorkflow.DisplayOrder,
                    Definition = JsonDocument.Parse(seedWorkflow.Definition.GetRawText()),
                    CreatedAt = now,
                    UpdatedAt = now,
                });
                continue;
            }

            workflow.LocaleId = locale.Id;
            workflow.Title = seedWorkflow.Title;
            workflow.Description = seedWorkflow.Description;
            workflow.Slug = seedWorkflow.Slug;
            workflow.DisplayOrder = seedWorkflow.DisplayOrder;
            workflow.Definition = JsonDocument.Parse(seedWorkflow.Definition.GetRawText());
            workflow.UpdatedAt = now;
            workflow.DeletedAt = null;
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
            .Where(workflow => workflow.Locale!.Code == localeCode)
            .OrderBy(workflow => workflow.DisplayOrder)
            .ToListAsync();

        if (examples.Count == 0 && localeCode != DefaultLocale)
        {
            examples = await dbContext.ExampleWorkflows
                .Include(workflow => workflow.Locale)
                .Where(workflow => workflow.Locale!.Code == DefaultLocale)
                .OrderBy(workflow => workflow.DisplayOrder)
                .ToListAsync();
        }

        var now = DateTimeOffset.UtcNow;

        foreach (var example in examples)
        {
            dbContext.UserWorkflows.Add(new UserWorkflow
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
            });
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
}
