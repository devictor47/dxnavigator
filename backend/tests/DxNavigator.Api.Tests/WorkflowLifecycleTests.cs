using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using DxNavigator.Api.Contracts;
using DxNavigator.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace DxNavigator.Api.Tests;

public sealed class WorkflowLifecycleTests : IClassFixture<DxNavigatorApiFactory>
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    private readonly DxNavigatorApiFactory factory;
    private readonly HttpClient client;

    public WorkflowLifecycleTests(DxNavigatorApiFactory factory)
    {
        this.factory = factory;
        client = factory.CreateClient();
    }

    [Fact]
    public async Task SavingWorkflowStoresItInTheUsersLibrary()
    {
        await factory.ResetDatabaseAsync();

        var response = await SaveWorkflowAsync("UTI", "itu");

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var savedWorkflow = await response.Content.ReadFromJsonAsync<UserWorkflowResponse>(JsonOptions);
        Assert.NotNull(savedWorkflow);
        Assert.Equal("UTI", savedWorkflow.Title);
        Assert.Equal("pt-BR", savedWorkflow.Language);

        var manageResponse = await client.GetAsync("/api/user-workflows/manage");
        manageResponse.EnsureSuccessStatusCode();
        var managedWorkflows = await manageResponse.Content
            .ReadFromJsonAsync<List<UserWorkflowManageResponse>>(JsonOptions);

        var managedWorkflow = Assert.Single(managedWorkflows!);
        Assert.Equal(savedWorkflow.Id, managedWorkflow.Id);
        Assert.False(managedWorkflow.IsInstalledFromMarketplace);
        Assert.Null(managedWorkflow.PublishedWorkflow);
    }

    [Fact]
    public async Task PublishingWorkflowCreatesMarketplaceSnapshot()
    {
        await factory.ResetDatabaseAsync();
        var savedWorkflow = await SaveWorkflowAndReadAsync("Chest Pain", "chest-pain");

        var publishResponse = await client.PostAsJsonAsync(
            $"/api/user-workflows/{savedWorkflow.Id}/publish",
            new PublishUserWorkflowRequest(IsAuthorPublic: true),
            JsonOptions);

        Assert.Equal(HttpStatusCode.Created, publishResponse.StatusCode);
        var publishedWorkflow = await publishResponse.Content
            .ReadFromJsonAsync<PublishedWorkflowResponse>(JsonOptions);

        Assert.NotNull(publishedWorkflow);
        Assert.Equal("Chest Pain", publishedWorkflow.Title);
        Assert.Equal("Test User", publishedWorkflow.AuthorName);
        Assert.Equal(0, publishedWorkflow.InstallCount);

        var detailResponse = await client.GetAsync($"/api/user-workflows/{savedWorkflow.Id}");
        detailResponse.EnsureSuccessStatusCode();
        var detail = await detailResponse.Content
            .ReadFromJsonAsync<UserWorkflowDetailResponse>(JsonOptions);

        Assert.NotNull(detail);
        Assert.NotNull(detail.PublishedWorkflow);
        Assert.Equal(publishedWorkflow.PublicId, detail.PublishedWorkflow.PublicId);
    }

    [Fact]
    public async Task InstallingMarketplaceWorkflowCreatesUserCopyAndIncrementsInstallCount()
    {
        await factory.ResetDatabaseAsync();
        var savedWorkflow = await SaveWorkflowAndReadAsync("Migraine", "migraine");
        var publishedWorkflow = await PublishWorkflowAndReadAsync(savedWorkflow.Id);

        var installResponse = await client.PostAsync(
            $"/api/marketplace/workflows/{publishedWorkflow.PublicId}/install",
            content: null);

        Assert.Equal(HttpStatusCode.Created, installResponse.StatusCode);

        using var scope = factory.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var publishedEntity = await dbContext.Workflows.SingleAsync();
        var userWorkflows = await dbContext.UserWorkflows
            .OrderBy(workflow => workflow.Id)
            .ToListAsync();

        Assert.Equal(1, publishedEntity.InstallCount);
        Assert.Equal(2, userWorkflows.Count);
        Assert.Equal(publishedEntity.Id, userWorkflows[1].SourceWorkflowId);
    }

    [Fact]
    public async Task UnpublishingWorkflowSoftDeletesMarketplaceSnapshotAfterInstalls()
    {
        await factory.ResetDatabaseAsync();
        var savedWorkflow = await SaveWorkflowAndReadAsync("Gastroenterocolitis", "geca");
        var publishedWorkflow = await PublishWorkflowAndReadAsync(savedWorkflow.Id);

        var installResponse = await client.PostAsync(
            $"/api/marketplace/workflows/{publishedWorkflow.PublicId}/install",
            content: null);
        installResponse.EnsureSuccessStatusCode();

        var unpublishResponse = await client.DeleteAsync($"/api/user-workflows/{savedWorkflow.Id}/published");

        Assert.Equal(HttpStatusCode.NoContent, unpublishResponse.StatusCode);

        using var scope = factory.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var softDeletedWorkflow = await dbContext.Workflows
            .IgnoreQueryFilters()
            .SingleAsync();

        Assert.NotNull(softDeletedWorkflow.DeletedAt);
        Assert.Equal(1, softDeletedWorkflow.InstallCount);

        var marketplaceResponse = await client.GetAsync("/api/marketplace/workflows");
        marketplaceResponse.EnsureSuccessStatusCode();
        var marketplaceWorkflows = await marketplaceResponse.Content
            .ReadFromJsonAsync<List<PublishedWorkflowResponse>>(JsonOptions);

        Assert.Empty(marketplaceWorkflows!);
    }

    [Fact]
    public async Task UnpublishingWorkflowWithoutInstallsHardDeletesMarketplaceSnapshot()
    {
        await factory.ResetDatabaseAsync();
        var savedWorkflow = await SaveWorkflowAndReadAsync("Private Draft", "private-draft");
        await PublishWorkflowAndReadAsync(savedWorkflow.Id);

        var unpublishResponse = await client.DeleteAsync($"/api/user-workflows/{savedWorkflow.Id}/published");

        Assert.Equal(HttpStatusCode.NoContent, unpublishResponse.StatusCode);

        using var scope = factory.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var publishedWorkflowCount = await dbContext.Workflows
            .IgnoreQueryFilters()
            .CountAsync();

        Assert.Equal(0, publishedWorkflowCount);
    }

    private async Task<HttpResponseMessage> SaveWorkflowAsync(string title, string slug)
    {
        return await client.PostAsJsonAsync(
            "/api/user-workflows",
            CreateSaveRequest(title, slug),
            JsonOptions);
    }

    private async Task<UserWorkflowResponse> SaveWorkflowAndReadAsync(string title, string slug)
    {
        var response = await SaveWorkflowAsync(title, slug);
        response.EnsureSuccessStatusCode();

        var workflow = await response.Content.ReadFromJsonAsync<UserWorkflowResponse>(JsonOptions);
        return workflow!;
    }

    private async Task<PublishedWorkflowResponse> PublishWorkflowAndReadAsync(int workflowId)
    {
        var response = await client.PostAsJsonAsync(
            $"/api/user-workflows/{workflowId}/publish",
            new PublishUserWorkflowRequest(IsAuthorPublic: false),
            JsonOptions);
        response.EnsureSuccessStatusCode();

        var workflow = await response.Content.ReadFromJsonAsync<PublishedWorkflowResponse>(JsonOptions);
        return workflow!;
    }

    private static SaveUserWorkflowRequest CreateSaveRequest(string title, string slug)
    {
        using var definition = JsonDocument.Parse(
            $$"""
            {
              "title": "{{title}}",
              "description": "Test workflow",
              "slug": "{{slug}}",
              "language": "pt-BR",
              "sections": [],
              "redFlags": [],
              "differentials": [],
              "workup": [],
              "hpiTemplate": ""
            }
            """);

        return new SaveUserWorkflowRequest(
            title,
            "Test workflow",
            slug,
            "pt-BR",
            definition.RootElement.Clone());
    }
}
