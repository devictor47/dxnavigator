using DxNavigator.Api.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace DxNavigator.Api.Tests;

public sealed class DxNavigatorApiFactory : WebApplicationFactory<Program>
{
    private readonly string connectionString = BuildTestConnectionString();

    public DxNavigatorApiFactory()
    {
        Environment.SetEnvironmentVariable("ConnectionStrings__DefaultConnection", connectionString);
        Environment.SetEnvironmentVariable("Database__Migrate", "false");
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Development");
        builder.ConfigureAppConfiguration(configuration =>
        {
            configuration.Sources.Clear();
            configuration.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["ConnectionStrings:DefaultConnection"] = connectionString,
                ["Database:Migrate"] = "false",
            });
        });

        builder.ConfigureTestServices(services =>
        {
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = TestAuthHandler.AuthenticationScheme;
                    options.DefaultChallengeScheme = TestAuthHandler.AuthenticationScheme;
                    options.DefaultScheme = TestAuthHandler.AuthenticationScheme;
                })
                .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>(
                    TestAuthHandler.AuthenticationScheme,
                    _ => { });
        });
    }

    public async Task ResetDatabaseAsync()
    {
        using var scope = Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await dbContext.Database.EnsureDeletedAsync();
        await dbContext.Database.MigrateAsync();

        if (!await dbContext.Users.AnyAsync(user => user.Id == TestAuthHandler.UserId))
        {
            dbContext.Users.Add(new ApplicationUser
            {
                Id = TestAuthHandler.UserId,
                Name = "Test User",
                UserName = "test@example.com",
                NormalizedUserName = "TEST@EXAMPLE.COM",
                Email = "test@example.com",
                NormalizedEmail = "TEST@EXAMPLE.COM",
                EmailConfirmed = true,
            });

            await dbContext.SaveChangesAsync();
        }
    }

    private static string BuildTestConnectionString()
    {
        var baseConnectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
            ?? "Host=localhost;Port=5432;Database=dxnavigator;Username=dxnavigator;Password=dxnavigator_dev_password";

        var builder = new NpgsqlConnectionStringBuilder(baseConnectionString)
        {
            Database = "dxnavigator_tests",
        };

        return builder.ConnectionString;
    }
}
