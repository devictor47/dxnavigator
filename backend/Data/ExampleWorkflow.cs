using System.Text.Json;

namespace DxNavigator.Api.Data;

public sealed class ExampleWorkflow
{
    public int Id { get; set; }

    public string Key { get; set; } = string.Empty;

    public int LocaleId { get; set; }

    public Locale? Locale { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Slug { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public JsonDocument Definition { get; set; } = JsonDocument.Parse("{}");

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset? DeletedAt { get; set; }
}
