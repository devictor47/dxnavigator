using DxNavigator.Api.Contracts;
using DxNavigator.Api.Data;
using System.Security.Claims;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace DxNavigator.Api.Endpoints;

public static class MarketplaceWorkflowEndpoints
{
    public static IEndpointRouteBuilder MapMarketplaceWorkflowEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/marketplace/workflows")
            .RequireAuthorization()
            .WithTags("Marketplace Workflows");

        group.MapGet("", ListPublishedWorkflowsAsync);
        group.MapPost("/{publicId:guid}/install", InstallPublishedWorkflowAsync);

        return routes;
    }

    private static async Task<IResult> ListPublishedWorkflowsAsync(ApplicationDbContext dbContext)
    {
        var workflows = await dbContext.Workflows
            .AsNoTracking()
            .Include(workflow => workflow.Locale)
            .Include(workflow => workflow.CreatorUser)
            .Where(workflow => workflow.Visibility == WorkflowVisibility.Public)
            .OrderByDescending(workflow => workflow.InstallCount)
            .ThenByDescending(workflow => workflow.UpdatedAt)
            .Select(workflow => new PublishedWorkflowResponse(
                workflow.Id,
                workflow.PublicId,
                workflow.Title,
                workflow.Description,
                workflow.Slug,
                workflow.Locale!.Code,
                workflow.IsAuthorPublic,
                workflow.IsAuthorPublic ? workflow.CreatorUser!.Name : null,
                workflow.InstallCount,
                workflow.CreatedAt,
                workflow.UpdatedAt))
            .ToListAsync();

        return Results.Ok(workflows);
    }

    private static async Task<IResult> InstallPublishedWorkflowAsync(
        Guid publicId,
        ClaimsPrincipal principal,
        ApplicationDbContext dbContext)
    {
        if (!TryGetUserId(principal, out var userId))
        {
            return Results.Unauthorized();
        }

        var publishedWorkflow = await dbContext.Workflows
            .Include(workflow => workflow.Locale)
            .SingleOrDefaultAsync(workflow =>
                workflow.PublicId == publicId &&
                workflow.Visibility == WorkflowVisibility.Public);

        if (publishedWorkflow is null)
        {
            return Results.NotFound();
        }

        var now = DateTimeOffset.UtcNow;
        await dbContext.UserWorkflows
            .Where(workflow => workflow.UserId == userId)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(workflow => workflow.DisplayOrder, workflow => workflow.DisplayOrder + 1));

        var userWorkflow = new UserWorkflow
        {
            UserId = userId,
            SourceWorkflowId = publishedWorkflow.Id,
            LocaleId = publishedWorkflow.LocaleId,
            Title = publishedWorkflow.Title,
            Description = publishedWorkflow.Description,
            Slug = publishedWorkflow.Slug,
            DisplayOrder = 0,
            Definition = JsonDocument.Parse(publishedWorkflow.Definition.RootElement.GetRawText()),
            CreatedAt = now,
            UpdatedAt = now,
        };

        dbContext.UserWorkflows.Add(userWorkflow);
        publishedWorkflow.InstallCount += 1;
        await dbContext.SaveChangesAsync();

        return Results.Created(
            $"/api/user-workflows/{userWorkflow.Id}",
            new UserWorkflowResponse(
                userWorkflow.Id,
                userWorkflow.Title,
                userWorkflow.Description,
                userWorkflow.Slug,
                publishedWorkflow.Locale!.Code,
                userWorkflow.DisplayOrder,
                userWorkflow.CreatedAt,
                userWorkflow.UpdatedAt));
    }

    private static bool TryGetUserId(ClaimsPrincipal principal, out int userId)
    {
        var userIdValue = principal.FindFirstValue(ClaimTypes.NameIdentifier);

        return int.TryParse(userIdValue, out userId);
    }
}
