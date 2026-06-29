using System.Text.Json;

namespace DxNavigator.Api.Data;

public sealed class ExampleWorkflowPreset
{
    public int Id { get; set; }

    public int ExampleWorkflowId { get; set; }

    public ExampleWorkflow? ExampleWorkflow { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public JsonDocument Answers { get; set; } = JsonDocument.Parse("{}");

    public int DisplayOrder { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
}
