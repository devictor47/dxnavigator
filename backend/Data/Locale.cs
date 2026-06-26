namespace DxNavigator.Api.Data;

public sealed class Locale
{
    public int Id { get; set; }

    public string Code { get; set; } = string.Empty;

    public string Label { get; set; } = string.Empty;

    public bool IsActive { get; set; } = true;
}
