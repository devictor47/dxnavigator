using System.Text.Json;

namespace DxNavigator.Api.Data;

public sealed class Workflow
{
    public int Id { get; set; }

    public Guid PublicId { get; set; } = Guid.NewGuid();

    public int CreatorUserId { get; set; }

    public ApplicationUser? CreatorUser { get; set; }

    public int LocaleId { get; set; }

    public Locale? Locale { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Slug { get; set; } = string.Empty;

    public WorkflowVisibility Visibility { get; set; } = WorkflowVisibility.Private;

    public JsonDocument Definition { get; set; } = JsonDocument.Parse("{}");

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset? DeletedAt { get; set; }
}
