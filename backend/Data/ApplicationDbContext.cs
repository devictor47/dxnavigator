using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DxNavigator.Api.Data;

public sealed class ApplicationDbContext
    : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Locale> Locales => Set<Locale>();

    public DbSet<Workflow> Workflows => Set<Workflow>();

    public DbSet<UserWorkflow> UserWorkflows => Set<UserWorkflow>();

    public DbSet<ExampleWorkflow> ExampleWorkflows => Set<ExampleWorkflow>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ApplicationUser>(entity =>
        {
            entity.Property(user => user.Name)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(user => user.CreatedAt)
                .IsRequired();

            entity.HasQueryFilter(user => user.DeletedAt == null);
        });

        builder.Entity<Locale>(entity =>
        {
            entity.Property(locale => locale.Code)
                .HasMaxLength(16)
                .IsRequired();

            entity.Property(locale => locale.Label)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(locale => locale.IsActive)
                .IsRequired();

            entity.HasIndex(locale => locale.Code)
                .IsUnique();

            entity.HasData(
                new Locale
                {
                    Id = 1,
                    Code = "en",
                    Label = "English",
                    IsActive = true,
                },
                new Locale
                {
                    Id = 2,
                    Code = "pt-BR",
                    Label = "Português",
                    IsActive = true,
                });
        });

        builder.Entity<Workflow>(entity =>
        {
            entity.Property(workflow => workflow.PublicId)
                .IsRequired();

            entity.Property(workflow => workflow.IsAuthorPublic)
                .IsRequired();

            entity.Property(workflow => workflow.InstallCount)
                .IsRequired();

            entity.Property(workflow => workflow.Title)
                .HasMaxLength(240)
                .IsRequired();

            entity.Property(workflow => workflow.Description)
                .HasMaxLength(1000);

            entity.Property(workflow => workflow.Slug)
                .HasMaxLength(240)
                .IsRequired();

            entity.Property(workflow => workflow.Visibility)
                .HasConversion(
                    visibility => visibility.ToString().ToLowerInvariant(),
                    value => Enum.Parse<WorkflowVisibility>(value, true))
                .HasMaxLength(32)
                .IsRequired();

            entity.Property(workflow => workflow.Definition)
                .HasColumnType("jsonb")
                .IsRequired();

            entity.Property(workflow => workflow.CreatedAt)
                .IsRequired();

            entity.Property(workflow => workflow.UpdatedAt)
                .IsRequired();

            entity.HasOne(workflow => workflow.CreatorUser)
                .WithMany()
                .HasForeignKey(workflow => workflow.CreatorUserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(workflow => workflow.Locale)
                .WithMany()
                .HasForeignKey(workflow => workflow.LocaleId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(workflow => workflow.SourceUserWorkflow)
                .WithMany()
                .HasForeignKey(workflow => workflow.SourceUserWorkflowId)
                .OnDelete(DeleteBehavior.SetNull);

            entity.HasIndex(workflow => workflow.PublicId)
                .IsUnique();

            entity.HasIndex(workflow => new { workflow.LocaleId, workflow.UpdatedAt })
                .HasDatabaseName("IX_Workflows_PublicMarketplace")
                .HasFilter("\"Visibility\" = 'public' AND \"DeletedAt\" IS NULL");

            entity.HasIndex(workflow => new { workflow.CreatorUserId, workflow.UpdatedAt })
                .HasDatabaseName("IX_Workflows_ActiveByCreator")
                .HasFilter("\"DeletedAt\" IS NULL");

            entity.HasIndex(workflow => workflow.SourceUserWorkflowId);

            entity.HasQueryFilter(workflow => workflow.DeletedAt == null);
        });

        builder.Entity<UserWorkflow>(entity =>
        {
            entity.Property(workflow => workflow.Title)
                .HasMaxLength(240)
                .IsRequired();

            entity.Property(workflow => workflow.Description)
                .HasMaxLength(1000);

            entity.Property(workflow => workflow.Slug)
                .HasMaxLength(240)
                .IsRequired();

            entity.Property(workflow => workflow.DisplayOrder)
                .IsRequired();

            entity.Property(workflow => workflow.Definition)
                .HasColumnType("jsonb")
                .IsRequired();

            entity.Property(workflow => workflow.CreatedAt)
                .IsRequired();

            entity.Property(workflow => workflow.UpdatedAt)
                .IsRequired();

            entity.HasOne(workflow => workflow.User)
                .WithMany()
                .HasForeignKey(workflow => workflow.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(workflow => workflow.SourceWorkflow)
                .WithMany()
                .HasForeignKey(workflow => workflow.SourceWorkflowId)
                .OnDelete(DeleteBehavior.SetNull);

            entity.HasOne(workflow => workflow.Locale)
                .WithMany()
                .HasForeignKey(workflow => workflow.LocaleId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(workflow => new { workflow.UserId, workflow.DisplayOrder })
                .HasDatabaseName("IX_UserWorkflows_ActiveByUser")
                .HasFilter("\"DeletedAt\" IS NULL");

            entity.HasIndex(workflow => workflow.SourceWorkflowId);

            entity.HasQueryFilter(workflow => workflow.DeletedAt == null);
        });

        builder.Entity<ExampleWorkflow>(entity =>
        {
            entity.Property(workflow => workflow.Key)
                .HasMaxLength(240)
                .IsRequired();

            entity.Property(workflow => workflow.Title)
                .HasMaxLength(240)
                .IsRequired();

            entity.Property(workflow => workflow.Description)
                .HasMaxLength(1000);

            entity.Property(workflow => workflow.Slug)
                .HasMaxLength(240)
                .IsRequired();

            entity.Property(workflow => workflow.DisplayOrder)
                .IsRequired();

            entity.Property(workflow => workflow.Definition)
                .HasColumnType("jsonb")
                .IsRequired();

            entity.Property(workflow => workflow.CreatedAt)
                .IsRequired();

            entity.Property(workflow => workflow.UpdatedAt)
                .IsRequired();

            entity.HasOne(workflow => workflow.Locale)
                .WithMany()
                .HasForeignKey(workflow => workflow.LocaleId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(workflow => workflow.Key)
                .IsUnique();

            entity.HasIndex(workflow => new { workflow.LocaleId, workflow.DisplayOrder })
                .HasDatabaseName("IX_ExampleWorkflows_ActiveByLocale")
                .HasFilter("\"DeletedAt\" IS NULL");

            entity.HasQueryFilter(workflow => workflow.DeletedAt == null);
        });
    }
}
