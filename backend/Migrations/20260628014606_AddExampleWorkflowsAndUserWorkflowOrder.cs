using System;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DxNavigator.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddExampleWorkflowsAndUserWorkflowOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserWorkflows_ActiveByUser",
                table: "UserWorkflows");

            migrationBuilder.AddColumn<int>(
                name: "DisplayOrder",
                table: "UserWorkflows",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ExampleWorkflows",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Key = table.Column<string>(type: "character varying(240)", maxLength: 240, nullable: false),
                    LocaleId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "character varying(240)", maxLength: 240, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Slug = table.Column<string>(type: "character varying(240)", maxLength: 240, nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    Definition = table.Column<JsonDocument>(type: "jsonb", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExampleWorkflows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExampleWorkflows_Locales_LocaleId",
                        column: x => x.LocaleId,
                        principalTable: "Locales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserWorkflows_ActiveByUser",
                table: "UserWorkflows",
                columns: new[] { "UserId", "DisplayOrder" },
                filter: "\"DeletedAt\" IS NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ExampleWorkflows_ActiveByLocale",
                table: "ExampleWorkflows",
                columns: new[] { "LocaleId", "DisplayOrder" },
                filter: "\"DeletedAt\" IS NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ExampleWorkflows_Key",
                table: "ExampleWorkflows",
                column: "Key",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExampleWorkflows");

            migrationBuilder.DropIndex(
                name: "IX_UserWorkflows_ActiveByUser",
                table: "UserWorkflows");

            migrationBuilder.DropColumn(
                name: "DisplayOrder",
                table: "UserWorkflows");

            migrationBuilder.CreateIndex(
                name: "IX_UserWorkflows_ActiveByUser",
                table: "UserWorkflows",
                columns: new[] { "UserId", "UpdatedAt" },
                filter: "\"DeletedAt\" IS NULL");
        }
    }
}
