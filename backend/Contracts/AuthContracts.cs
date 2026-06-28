namespace DxNavigator.Api.Contracts;

public sealed record RegisterRequest(
    string Name,
    string Email,
    string Password,
    string? PreferredLocale = null);

public sealed record LoginRequest(
    string Email,
    string Password,
    string? PreferredLocale = null);

public sealed record CurrentUserResponse(
    int Id,
    string Name,
    string Email);

public sealed record AuthErrorResponse(
    string Message,
    IReadOnlyList<string> Errors,
    string? Code = null);
