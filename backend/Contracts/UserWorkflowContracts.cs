using System.Text.Json;

namespace DxNavigator.Api.Contracts;

public sealed record SaveUserWorkflowRequest(
    string Title,
    string? Description,
    string Slug,
    string Language,
    JsonElement Definition);

public sealed record PublishUserWorkflowRequest(
    bool IsAuthorPublic);

public sealed record ReorderUserWorkflowsRequest(
    IReadOnlyList<int> WorkflowIds);

public sealed record UserWorkflowResponse(
    int Id,
    string Title,
    string? Description,
    string Slug,
    string Language,
    int DisplayOrder,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record UserWorkflowDetailResponse(
    int Id,
    string Title,
    string? Description,
    string Slug,
    string Language,
    int DisplayOrder,
    PublishedWorkflowResponse? PublishedWorkflow,
    JsonElement Definition,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record UserWorkflowManageResponse(
    int Id,
    string Title,
    string? Description,
    string Slug,
    string Language,
    int DisplayOrder,
    bool IsInstalledFromMarketplace,
    PublishedWorkflowResponse? PublishedWorkflow,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record PublishedWorkflowResponse(
    int Id,
    Guid PublicId,
    string Title,
    string? Description,
    string Slug,
    string Language,
    bool IsAuthorPublic,
    string? AuthorName,
    int InstallCount,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);
