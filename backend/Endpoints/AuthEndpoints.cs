using System.Security.Claims;
using DxNavigator.Api.Contracts;
using DxNavigator.Api.Data;
using DxNavigator.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace DxNavigator.Api.Endpoints;

public static class AuthEndpoints
{
    private const string GoogleProvider = "Google";
    private const string DuplicateEmailCode = "DuplicateEmail";

    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/auth")
            .WithTags("Authentication");

        group.MapPost("/register", RegisterAsync);
        group.MapPost("/login", LoginAsync);
        group.MapPost("/logout", LogoutAsync).RequireAuthorization();
        group.MapGet("/me", GetCurrentUserAsync).RequireAuthorization();
        group.MapGet("/google/login", StartGoogleLogin);
        group.MapGet("/google/callback", CompleteGoogleLoginAsync);

        return routes;
    }

    private static async Task<IResult> RegisterAsync(
        RegisterRequest request,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ExampleWorkflowService exampleWorkflowService)
    {
        var name = request.Name.Trim();
        var email = request.Email.Trim();

        if (string.IsNullOrWhiteSpace(name) ||
            string.IsNullOrWhiteSpace(email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return Results.BadRequest(new AuthErrorResponse(
                "Registration requires name, email, and password.",
                ["Name, email, and password are required."]));
        }

        if (request.Password.Length < 6)
        {
            return Results.BadRequest(new AuthErrorResponse(
                "Password is too short.",
                ["Password must be at least 6 characters long."]));
        }

        var user = new ApplicationUser
        {
            Name = name,
            Email = email,
            UserName = email,
            EmailConfirmed = false,
        };

        var result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return Results.BadRequest(ToRegistrationErrorResponse(result.Errors));
        }

        await exampleWorkflowService.CopyExamplesToUserIfEmptyAsync(user.Id, request.PreferredLocale);
        await signInManager.SignInAsync(user, isPersistent: true);

        return Results.Ok(ToCurrentUserResponse(user));
    }

    private static async Task<IResult> LoginAsync(
        LoginRequest request,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ExampleWorkflowService exampleWorkflowService)
    {
        var user = await userManager.FindByEmailAsync(request.Email.Trim());

        if (user is null)
        {
            return Results.Unauthorized();
        }

        var result = await signInManager.PasswordSignInAsync(
            user,
            request.Password,
            isPersistent: true,
            lockoutOnFailure: true);

        if (!result.Succeeded)
        {
            return Results.Unauthorized();
        }

        await exampleWorkflowService.CopyExamplesToUserIfEmptyAsync(user.Id, request.PreferredLocale);

        return Results.Ok(ToCurrentUserResponse(user));
    }

    private static async Task<IResult> LogoutAsync(SignInManager<ApplicationUser> signInManager)
    {
        await signInManager.SignOutAsync();

        return Results.NoContent();
    }

    private static async Task<IResult> GetCurrentUserAsync(
        ClaimsPrincipal principal,
        UserManager<ApplicationUser> userManager,
        ExampleWorkflowService exampleWorkflowService)
    {
        var user = await userManager.GetUserAsync(principal);

        if (user is null)
        {
            return Results.Unauthorized();
        }

        await exampleWorkflowService.CopyExamplesToUserIfEmptyAsync(user.Id, null);

        return Results.Ok(ToCurrentUserResponse(user));
    }

    private static IResult StartGoogleLogin(
        string? returnUrl,
        string? preferredLocale,
        IConfiguration configuration,
        SignInManager<ApplicationUser> signInManager)
    {
        if (!IsGoogleConfigured(configuration))
        {
            return Results.Problem(
                title: "Google login is not configured.",
                detail: "Set Authentication:Google:ClientId and Authentication:Google:ClientSecret.",
                statusCode: StatusCodes.Status501NotImplemented);
        }

        var safeReturnUrl = NormalizeReturnUrl(returnUrl);
        var redirectUrl =
            $"/api/auth/google/callback?returnUrl={Uri.EscapeDataString(safeReturnUrl)}" +
            $"&preferredLocale={Uri.EscapeDataString(preferredLocale ?? string.Empty)}";
        var properties = signInManager.ConfigureExternalAuthenticationProperties(
            GoogleProvider,
            redirectUrl);

        return Results.Challenge(properties, [GoogleProvider]);
    }

    private static async Task<IResult> CompleteGoogleLoginAsync(
        string? returnUrl,
        string? preferredLocale,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ExampleWorkflowService exampleWorkflowService)
    {
        var info = await signInManager.GetExternalLoginInfoAsync();

        if (info is null)
        {
            return Results.BadRequest(new AuthErrorResponse(
                "Google login failed.",
                ["The external login information could not be read."]));
        }

        var externalSignIn = await signInManager.ExternalLoginSignInAsync(
            info.LoginProvider,
            info.ProviderKey,
            isPersistent: true,
            bypassTwoFactor: true);

        var safeReturnUrl = NormalizeReturnUrl(returnUrl);

        if (externalSignIn.Succeeded)
        {
            var externalUser = await userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

            if (externalUser is not null)
            {
                await exampleWorkflowService.CopyExamplesToUserIfEmptyAsync(
                    externalUser.Id,
                    preferredLocale);
            }

            return Results.LocalRedirect(safeReturnUrl);
        }

        var email = info.Principal.FindFirstValue(ClaimTypes.Email);

        if (string.IsNullOrWhiteSpace(email))
        {
            return Results.BadRequest(new AuthErrorResponse(
                "Google login failed.",
                ["Google did not provide an email address."]));
        }

        var user = await userManager.FindByEmailAsync(email);

        if (user is null)
        {
            user = new ApplicationUser
            {
                Name = info.Principal.FindFirstValue(ClaimTypes.Name) ?? email,
                Email = email,
                UserName = email,
                EmailConfirmed = true,
            };

            var createResult = await userManager.CreateAsync(user);

            if (!createResult.Succeeded)
            {
                return Results.BadRequest(new AuthErrorResponse(
                    "Google account creation failed.",
                    createResult.Errors.Select(error => error.Description).ToArray()));
            }

            await exampleWorkflowService.CopyExamplesToUserIfEmptyAsync(user.Id, preferredLocale);
        }

        var addLoginResult = await userManager.AddLoginAsync(user, info);

        if (!addLoginResult.Succeeded &&
            addLoginResult.Errors.All(error => error.Code != "LoginAlreadyAssociated"))
        {
            return Results.BadRequest(new AuthErrorResponse(
                "Google account linking failed.",
                addLoginResult.Errors.Select(error => error.Description).ToArray()));
        }

        await signInManager.SignInAsync(user, isPersistent: true);
        await exampleWorkflowService.CopyExamplesToUserIfEmptyAsync(user.Id, preferredLocale);

        return Results.LocalRedirect(safeReturnUrl);
    }

    private static CurrentUserResponse ToCurrentUserResponse(ApplicationUser user)
    {
        return new CurrentUserResponse(
            user.Id,
            user.Name,
            user.Email ?? string.Empty);
    }

    private static AuthErrorResponse ToRegistrationErrorResponse(
        IEnumerable<IdentityError> errors)
    {
        var errorList = errors.ToArray();

        if (errorList.Any(error =>
            error.Code is "DuplicateEmail" or "DuplicateUserName"))
        {
            return new AuthErrorResponse(
                "Email is already registered.",
                ["Email is already registered."],
                DuplicateEmailCode);
        }

        return new AuthErrorResponse(
            "Registration failed.",
            errorList.Select(error => error.Description).ToArray());
    }

    private static bool IsGoogleConfigured(IConfiguration configuration)
    {
        return !string.IsNullOrWhiteSpace(configuration["Authentication:Google:ClientId"]) &&
            !string.IsNullOrWhiteSpace(configuration["Authentication:Google:ClientSecret"]);
    }

    private static string NormalizeReturnUrl(string? returnUrl)
    {
        return !string.IsNullOrWhiteSpace(returnUrl) &&
            returnUrl.StartsWith('/') &&
            !returnUrl.StartsWith("//", StringComparison.Ordinal) &&
            !returnUrl.Contains("://", StringComparison.Ordinal)
            ? returnUrl
            : "/private";
    }
}
