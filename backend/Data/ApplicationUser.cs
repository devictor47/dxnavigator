using Microsoft.AspNetCore.Identity;

namespace DxNavigator.Api.Data;

public sealed class ApplicationUser : IdentityUser<int>
{
    public string Name { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset? DeletedAt { get; set; }
}
