using System.Security.Claims;
using System.Text.Json;
using DxNavigator.Api.Contracts;
using DxNavigator.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DxNavigator.Api.Endpoints;

public static class UserWorkflowEndpoints
{
    public static IEndpointRouteBuilder MapUserWorkflowEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/user-workflows")
            .RequireAuthorization()
            .WithTags("User Workflows");

        group.MapGet("", ListWorkflowsAsync);
        group.MapGet("/manage", ListManageWorkflowsAsync);
        group.MapGet("/{id:int}", GetWorkflowAsync);
        group.MapPost("", SaveWorkflowAsync);
        group.MapPut("/{id:int}", UpdateWorkflowAsync);
        group.MapDelete("/{id:int}", DeleteWorkflowAsync);
        group.MapPost("/{id:int}/publish", PublishWorkflowAsync);
        group.MapPut("/{id:int}/published", UpdatePublishedWorkflowAsync);
        group.MapDelete("/{id:int}/published", UnpublishWorkflowAsync);
        group.MapPut("/order", ReorderWorkflowsAsync);

        return routes;
    }

    private static async Task<IResult> ListWorkflowsAsync(
        ClaimsPrincipal principal,
        ApplicationDbContext dbContext)
    {
        if (!TryGetUserId(principal, out var userId))
        {
            return Results.Unauthorized();
        }

        var workflows = await dbContext.UserWorkflows
            .AsNoTracking()
            .Include(workflow => workflow.Locale)
            .Where(workflow => workflow.UserId == userId)
            .OrderBy(workflow => workflow.DisplayOrder)
            .ThenByDescending(workflow => workflow.CreatedAt)
            .Select(workflow => ToResponse(workflow, workflow.Locale!.Code))
            .ToListAsync();

        return Results.Ok(workflows);
    }

    private static async Task<IResult> ListManageWorkflowsAsync(
        ClaimsPrincipal principal,
        ApplicationDbContext dbContext)
    {
        if (!TryGetUserId(principal, out var userId))
        {
            return Results.Unauthorized();
        }

        var userWorkflows = await dbContext.UserWorkflows
            .AsNoTracking()
            .Include(workflow => workflow.Locale)
            .Where(workflow => workflow.UserId == userId)
            .OrderBy(workflow => workflow.DisplayOrder)
            .ThenByDescending(workflow => workflow.CreatedAt)
            .ToListAsync();

        var userWorkflowIds = userWorkflows.Select(workflow => workflow.Id).ToList();
        var publishedWorkflows = await dbContext.Workflows
            .AsNoTracking()
            .Include(workflow => workflow.Locale)
            .Include(workflow => workflow.CreatorUser)
            .Where(workflow =>
                workflow.CreatorUserId == userId &&
                workflow.SourceUserWorkflowId != null &&
                userWorkflowIds.Contains(workflow.SourceUserWorkflowId.Value) &&
                workflow.Visibility == WorkflowVisibility.Public)
            .ToListAsync();
        var publishedBySourceId = publishedWorkflows
            .Where(workflow => workflow.SourceUserWorkflowId is not null)
            .ToDictionary(workflow => workflow.SourceUserWorkflowId!.Value);

        var response = userWorkflows
            .Select(workflow =>
            {
                publishedBySourceId.TryGetValue(workflow.Id, out var publishedWorkflow);

                return new UserWorkflowManageResponse(
                    workflow.Id,
                    workflow.Title,
                    workflow.Description,
                    workflow.Slug,
                    workflow.Locale!.Code,
                    workflow.DisplayOrder,
                    workflow.SourceWorkflowId is not null,
                    publishedWorkflow is null
                        ? null
                        : ToPublishedResponse(publishedWorkflow, publishedWorkflow.Locale!.Code),
                    workflow.CreatedAt,
                    workflow.UpdatedAt);
            })
            .ToList();

        return Results.Ok(response);
    }

    private static async Task<IResult> GetWorkflowAsync(
        int id,
        ClaimsPrincipal principal,
        ApplicationDbContext dbContext)
    {
        if (!TryGetUserId(principal, out var userId))
        {
            return Results.Unauthorized();
        }

        var workflow = await dbContext.UserWorkflows
            .AsNoTracking()
            .Include(workflow => workflow.Locale)
            .SingleOrDefaultAsync(workflow => workflow.Id == id && workflow.UserId == userId);

        var publishedWorkflow = workflow is null
            ? null
            : await dbContext.Workflows
                .AsNoTracking()
                .Include(publishedWorkflow => publishedWorkflow.Locale)
                .Include(publishedWorkflow => publishedWorkflow.CreatorUser)
                .SingleOrDefaultAsync(publishedWorkflow =>
                    publishedWorkflow.CreatorUserId == userId &&
                    publishedWorkflow.SourceUserWorkflowId == workflow.Id &&
                    publishedWorkflow.Visibility == WorkflowVisibility.Public);

        return workflow is null
            ? Results.NotFound()
            : Results.Ok(ToDetailResponse(
                workflow,
                workflow.Locale!.Code,
                publishedWorkflow is null
                    ? null
                    : ToPublishedResponse(publishedWorkflow, publishedWorkflow.Locale!.Code)));
    }

    private static async Task<IResult> SaveWorkflowAsync(
        SaveUserWorkflowRequest request,
        ClaimsPrincipal principal,
        ApplicationDbContext dbContext)
    {
        if (!TryGetUserId(principal, out var userId))
        {
            return Results.Unauthorized();
        }

        var parsedRequest = await ParseWorkflowRequestAsync(request, dbContext);

        if (!parsedRequest.IsValid)
        {
            return parsedRequest.Error!;
        }

        var payload = parsedRequest.Payload!;
        var now = DateTimeOffset.UtcNow;
        await ShiftUserWorkflowsDownAsync(dbContext, userId);
        var workflow = new UserWorkflow
        {
            UserId = userId,
            LocaleId = payload.Locale.Id,
            Title = payload.Title,
            Description = payload.Description,
            Slug = payload.Slug,
            DisplayOrder = 0,
            Definition = JsonDocument.Parse(payload.Definition.GetRawText()),
            CreatedAt = now,
            UpdatedAt = now,
        };

        dbContext.UserWorkflows.Add(workflow);
        await dbContext.SaveChangesAsync();

        return Results.Created(
            $"/api/user-workflows/{workflow.Id}",
            ToResponse(workflow, payload.Locale.Code));
    }

    private static async Task<IResult> UpdateWorkflowAsync(
        int id,
        SaveUserWorkflowRequest request,
        ClaimsPrincipal principal,
        ApplicationDbContext dbContext)
    {
        if (!TryGetUserId(principal, out var userId))
        {
            return Results.Unauthorized();
        }

        var workflow = await dbContext.UserWorkflows
            .SingleOrDefaultAsync(workflow => workflow.Id == id && workflow.UserId == userId);

        if (workflow is null)
        {
            return Results.NotFound();
        }

        var parsedRequest = await ParseWorkflowRequestAsync(request, dbContext);

        if (!parsedRequest.IsValid)
        {
            return parsedRequest.Error!;
        }

        var payload = parsedRequest.Payload!;
        workflow.LocaleId = payload.Locale.Id;
        workflow.Title = payload.Title;
        workflow.Description = payload.Description;
        workflow.Slug = payload.Slug;
        workflow.Definition = JsonDocument.Parse(payload.Definition.GetRawText());
        workflow.UpdatedAt = DateTimeOffset.UtcNow;

        await dbContext.SaveChangesAsync();

        return Results.Ok(ToResponse(workflow, payload.Locale.Code));
    }

    private static async Task<IResult> PublishWorkflowAsync(
        int id,
        PublishUserWorkflowRequest request,
        ClaimsPrincipal principal,
        ApplicationDbContext dbContext)
    {
        if (!TryGetUserId(principal, out var userId))
        {
            return Results.Unauthorized();
        }

        var userWorkflow = await dbContext.UserWorkflows
            .Include(workflow => workflow.Locale)
            .Include(workflow => workflow.User)
            .SingleOrDefaultAsync(workflow => workflow.Id == id && workflow.UserId == userId);

        if (userWorkflow is null)
        {
            return Results.NotFound();
        }

        var existingPublishedWorkflow = await dbContext.Workflows
            .AsNoTracking()
            .Include(workflow => workflow.Locale)
            .Include(workflow => workflow.CreatorUser)
            .SingleOrDefaultAsync(workflow =>
                workflow.CreatorUserId == userId &&
                workflow.SourceUserWorkflowId == userWorkflow.Id &&
                workflow.Visibility == WorkflowVisibility.Public);

        if (existingPublishedWorkflow is not null)
        {
            return Results.Ok(ToPublishedResponse(
                existingPublishedWorkflow,
                existingPublishedWorkflow.Locale!.Code));
        }

        var now = DateTimeOffset.UtcNow;
        var publishedWorkflow = new Workflow
        {
            CreatorUserId = userId,
            CreatorUser = userWorkflow.User,
            SourceUserWorkflowId = userWorkflow.Id,
            LocaleId = userWorkflow.LocaleId,
            Title = userWorkflow.Title,
            Description = userWorkflow.Description,
            Slug = userWorkflow.Slug,
            Visibility = WorkflowVisibility.Public,
            IsAuthorPublic = request.IsAuthorPublic,
            Definition = JsonDocument.Parse(userWorkflow.Definition.RootElement.GetRawText()),
            CreatedAt = now,
            UpdatedAt = now,
        };

        dbContext.Workflows.Add(publishedWorkflow);
        await dbContext.SaveChangesAsync();

        return Results.Created(
            $"/api/marketplace/workflows/{publishedWorkflow.PublicId}",
            ToPublishedResponse(publishedWorkflow, userWorkflow.Locale!.Code));
    }

    private static async Task<IResult> DeleteWorkflowAsync(
        int id,
        ClaimsPrincipal principal,
        ApplicationDbContext dbContext)
    {
        if (!TryGetUserId(principal, out var userId))
        {
            return Results.Unauthorized();
        }

        var workflow = await dbContext.UserWorkflows
            .SingleOrDefaultAsync(workflow => workflow.Id == id && workflow.UserId == userId);

        if (workflow is null)
        {
            return Results.NotFound();
        }

        dbContext.UserWorkflows.Remove(workflow);
        await dbContext.SaveChangesAsync();

        return Results.NoContent();
    }

    private static async Task<IResult> UpdatePublishedWorkflowAsync(
        int id,
        ClaimsPrincipal principal,
        ApplicationDbContext dbContext)
    {
        if (!TryGetUserId(principal, out var userId))
        {
            return Results.Unauthorized();
        }

        var userWorkflow = await dbContext.UserWorkflows
            .Include(workflow => workflow.Locale)
            .SingleOrDefaultAsync(workflow => workflow.Id == id && workflow.UserId == userId);

        if (userWorkflow is null)
        {
            return Results.NotFound();
        }

        var publishedWorkflow = await dbContext.Workflows
            .Include(workflow => workflow.Locale)
            .Include(workflow => workflow.CreatorUser)
            .SingleOrDefaultAsync(workflow =>
                workflow.CreatorUserId == userId &&
                workflow.SourceUserWorkflowId == userWorkflow.Id &&
                workflow.Visibility == WorkflowVisibility.Public);

        if (publishedWorkflow is null)
        {
            return Results.NotFound();
        }

        publishedWorkflow.LocaleId = userWorkflow.LocaleId;
        publishedWorkflow.Title = userWorkflow.Title;
        publishedWorkflow.Description = userWorkflow.Description;
        publishedWorkflow.Slug = userWorkflow.Slug;
        publishedWorkflow.Definition = JsonDocument.Parse(userWorkflow.Definition.RootElement.GetRawText());
        publishedWorkflow.UpdatedAt = DateTimeOffset.UtcNow;

        await dbContext.SaveChangesAsync();

        return Results.Ok(ToPublishedResponse(publishedWorkflow, userWorkflow.Locale!.Code));
    }

    private static async Task<IResult> UnpublishWorkflowAsync(
        int id,
        ClaimsPrincipal principal,
        ApplicationDbContext dbContext)
    {
        if (!TryGetUserId(principal, out var userId))
        {
            return Results.Unauthorized();
        }

        var userWorkflow = await dbContext.UserWorkflows
            .SingleOrDefaultAsync(workflow => workflow.Id == id && workflow.UserId == userId);

        if (userWorkflow is null)
        {
            return Results.NotFound();
        }

        var publishedWorkflow = await dbContext.Workflows
            .SingleOrDefaultAsync(workflow =>
                workflow.CreatorUserId == userId &&
                workflow.SourceUserWorkflowId == userWorkflow.Id &&
                workflow.Visibility == WorkflowVisibility.Public);

        if (publishedWorkflow is null)
        {
            return Results.NotFound();
        }

        if (publishedWorkflow.InstallCount == 0)
        {
            dbContext.Workflows.Remove(publishedWorkflow);
        }
        else
        {
            var now = DateTimeOffset.UtcNow;
            publishedWorkflow.DeletedAt = now;
            publishedWorkflow.UpdatedAt = now;
        }

        await dbContext.SaveChangesAsync();

        return Results.NoContent();
    }

    private static async Task<IResult> ReorderWorkflowsAsync(
        ReorderUserWorkflowsRequest request,
        ClaimsPrincipal principal,
        ApplicationDbContext dbContext)
    {
        if (!TryGetUserId(principal, out var userId))
        {
            return Results.Unauthorized();
        }

        var requestedIds = request.WorkflowIds.Distinct().ToArray();

        if (requestedIds.Length != request.WorkflowIds.Count)
        {
            return Results.BadRequest(new ProblemDetails
            {
                Title = "Workflow order is invalid.",
                Detail = "Workflow IDs must be unique.",
            });
        }

        var workflows = await dbContext.UserWorkflows
            .Where(workflow => workflow.UserId == userId)
            .ToListAsync();

        if (requestedIds.Length != workflows.Count ||
            workflows.Any(workflow => !requestedIds.Contains(workflow.Id)))
        {
            return Results.BadRequest(new ProblemDetails
            {
                Title = "Workflow order is incomplete.",
                Detail = "Submit every workflow in the user's library exactly once.",
            });
        }

        var workflowById = workflows.ToDictionary(workflow => workflow.Id);
        var now = DateTimeOffset.UtcNow;

        for (var index = 0; index < requestedIds.Length; index += 1)
        {
            var workflow = workflowById[requestedIds[index]];
            workflow.DisplayOrder = index;
            workflow.UpdatedAt = now;
        }

        await dbContext.SaveChangesAsync();

        return Results.NoContent();
    }

    private static async Task ShiftUserWorkflowsDownAsync(ApplicationDbContext dbContext, int userId)
    {
        await dbContext.UserWorkflows
            .Where(workflow => workflow.UserId == userId)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(workflow => workflow.DisplayOrder, workflow => workflow.DisplayOrder + 1));
    }

    private static async Task<ParsedWorkflowRequest> ParseWorkflowRequestAsync(
        SaveUserWorkflowRequest request,
        ApplicationDbContext dbContext)
    {
        var title = request.Title.Trim();
        var slug = request.Slug.Trim();
        var language = request.Language.Trim();
        var description = string.IsNullOrWhiteSpace(request.Description)
            ? null
            : request.Description.Trim();

        if (string.IsNullOrWhiteSpace(title) ||
            string.IsNullOrWhiteSpace(slug) ||
            string.IsNullOrWhiteSpace(language) ||
            request.Definition.ValueKind is JsonValueKind.Undefined or JsonValueKind.Null)
        {
            return ParsedWorkflowRequest.Invalid(Results.BadRequest(new ProblemDetails
            {
                Title = "Workflow is incomplete.",
                Detail = "Title, slug, language, and definition are required.",
            }));
        }

        var locale = await dbContext.Locales
            .Where(locale => locale.IsActive)
            .SingleOrDefaultAsync(locale => locale.Code == language);

        if (locale is null)
        {
            return ParsedWorkflowRequest.Invalid(Results.BadRequest(new ProblemDetails
            {
                Title = "Unsupported workflow language.",
                Detail = $"Language '{language}' is not configured.",
            }));
        }

        return ParsedWorkflowRequest.Valid(new WorkflowPayload(
            title,
            description,
            slug,
            locale,
            request.Definition));
    }

    private static bool TryGetUserId(ClaimsPrincipal principal, out int userId)
    {
        var userIdValue = principal.FindFirstValue(ClaimTypes.NameIdentifier);

        return int.TryParse(userIdValue, out userId);
    }

    private static UserWorkflowResponse ToResponse(UserWorkflow workflow, string language)
    {
        return new UserWorkflowResponse(
            workflow.Id,
            workflow.Title,
            workflow.Description,
            workflow.Slug,
            language,
            workflow.DisplayOrder,
            workflow.CreatedAt,
            workflow.UpdatedAt);
    }

    private static UserWorkflowDetailResponse ToDetailResponse(
        UserWorkflow workflow,
        string language,
        PublishedWorkflowResponse? publishedWorkflow)
    {
        return new UserWorkflowDetailResponse(
            workflow.Id,
            workflow.Title,
            workflow.Description,
            workflow.Slug,
            language,
            workflow.DisplayOrder,
            publishedWorkflow,
            workflow.Definition.RootElement.Clone(),
            workflow.CreatedAt,
            workflow.UpdatedAt);
    }

    private static PublishedWorkflowResponse ToPublishedResponse(Workflow workflow, string language)
    {
        return new PublishedWorkflowResponse(
            workflow.Id,
            workflow.PublicId,
            workflow.Title,
            workflow.Description,
            workflow.Slug,
            language,
            workflow.IsAuthorPublic,
            workflow.IsAuthorPublic ? workflow.CreatorUser?.Name : null,
            workflow.InstallCount,
            workflow.CreatedAt,
            workflow.UpdatedAt);
    }

    private sealed record WorkflowPayload(
        string Title,
        string? Description,
        string Slug,
        Locale Locale,
        JsonElement Definition);

    private sealed record ParsedWorkflowRequest(
        bool IsValid,
        WorkflowPayload? Payload,
        IResult? Error)
    {
        public static ParsedWorkflowRequest Valid(WorkflowPayload payload)
        {
            return new ParsedWorkflowRequest(true, payload, null);
        }

        public static ParsedWorkflowRequest Invalid(IResult error)
        {
            return new ParsedWorkflowRequest(false, null, error);
        }
    }
}
