using System.Text.Json;

namespace DxNavigator.Api.Data;

public sealed class UserWorkflow
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public ApplicationUser? User { get; set; }

    public int? SourceWorkflowId { get; set; }

    public Workflow? SourceWorkflow { get; set; }

    public int LocaleId { get; set; }

    public Locale? Locale { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Slug { get; set; } = string.Empty;

    public JsonDocument Definition { get; set; } = JsonDocument.Parse("{}");

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset? DeletedAt { get; set; }
}
