using System;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DxNavigator.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkflowPresetTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExampleWorkflowPresets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ExampleWorkflowId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Answers = table.Column<JsonDocument>(type: "jsonb", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExampleWorkflowPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExampleWorkflowPresets_ExampleWorkflows_ExampleWorkflowId",
                        column: x => x.ExampleWorkflowId,
                        principalTable: "ExampleWorkflows",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserWorkflowPresets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserWorkflowId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Answers = table.Column<JsonDocument>(type: "jsonb", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWorkflowPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserWorkflowPresets_UserWorkflows_UserWorkflowId",
                        column: x => x.UserWorkflowId,
                        principalTable: "UserWorkflows",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowPresets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WorkflowId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Answers = table.Column<JsonDocument>(type: "jsonb", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowPresets_Workflows_WorkflowId",
                        column: x => x.WorkflowId,
                        principalTable: "Workflows",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExampleWorkflowPresets_ExampleWorkflowId_DisplayOrder",
                table: "ExampleWorkflowPresets",
                columns: new[] { "ExampleWorkflowId", "DisplayOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_UserWorkflowPresets_UserWorkflowId_DisplayOrder",
                table: "UserWorkflowPresets",
                columns: new[] { "UserWorkflowId", "DisplayOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowPresets_WorkflowId_DisplayOrder",
                table: "WorkflowPresets",
                columns: new[] { "WorkflowId", "DisplayOrder" });

            migrationBuilder.Sql(
                """
                INSERT INTO "ExampleWorkflowPresets"
                    ("ExampleWorkflowId", "Title", "Description", "Answers", "DisplayOrder", "CreatedAt", "UpdatedAt")
                SELECT
                    workflow."Id",
                    preset.value ->> 'title',
                    NULLIF(preset.value ->> 'description', ''),
                    COALESCE(preset.value -> 'answers', '{}'::jsonb),
                    preset.ordinality::int - 1,
                    workflow."CreatedAt",
                    workflow."UpdatedAt"
                FROM "ExampleWorkflows" AS workflow
                CROSS JOIN LATERAL jsonb_array_elements(
                    CASE
                        WHEN jsonb_typeof(workflow."Definition" -> 'presets') = 'array'
                        THEN workflow."Definition" -> 'presets'
                        ELSE '[]'::jsonb
                    END)
                    WITH ORDINALITY AS preset(value, ordinality)
                WHERE preset.value ? 'title'
                    AND preset.value ? 'answers';

                UPDATE "ExampleWorkflows"
                SET "Definition" = "Definition" - 'presets'
                WHERE "Definition" ? 'presets';

                INSERT INTO "UserWorkflowPresets"
                    ("UserWorkflowId", "Title", "Description", "Answers", "DisplayOrder", "CreatedAt", "UpdatedAt")
                SELECT
                    workflow."Id",
                    preset.value ->> 'title',
                    NULLIF(preset.value ->> 'description', ''),
                    COALESCE(preset.value -> 'answers', '{}'::jsonb),
                    preset.ordinality::int - 1,
                    workflow."CreatedAt",
                    workflow."UpdatedAt"
                FROM "UserWorkflows" AS workflow
                CROSS JOIN LATERAL jsonb_array_elements(
                    CASE
                        WHEN jsonb_typeof(workflow."Definition" -> 'presets') = 'array'
                        THEN workflow."Definition" -> 'presets'
                        ELSE '[]'::jsonb
                    END)
                    WITH ORDINALITY AS preset(value, ordinality)
                WHERE preset.value ? 'title'
                    AND preset.value ? 'answers';

                UPDATE "UserWorkflows"
                SET "Definition" = "Definition" - 'presets'
                WHERE "Definition" ? 'presets';

                INSERT INTO "WorkflowPresets"
                    ("WorkflowId", "Title", "Description", "Answers", "DisplayOrder", "CreatedAt", "UpdatedAt")
                SELECT
                    workflow."Id",
                    preset.value ->> 'title',
                    NULLIF(preset.value ->> 'description', ''),
                    COALESCE(preset.value -> 'answers', '{}'::jsonb),
                    preset.ordinality::int - 1,
                    workflow."CreatedAt",
                    workflow."UpdatedAt"
                FROM "Workflows" AS workflow
                CROSS JOIN LATERAL jsonb_array_elements(
                    CASE
                        WHEN jsonb_typeof(workflow."Definition" -> 'presets') = 'array'
                        THEN workflow."Definition" -> 'presets'
                        ELSE '[]'::jsonb
                    END)
                    WITH ORDINALITY AS preset(value, ordinality)
                WHERE preset.value ? 'title'
                    AND preset.value ? 'answers';

                UPDATE "Workflows"
                SET "Definition" = "Definition" - 'presets'
                WHERE "Definition" ? 'presets';
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExampleWorkflowPresets");

            migrationBuilder.DropTable(
                name: "UserWorkflowPresets");

            migrationBuilder.DropTable(
                name: "WorkflowPresets");
        }
    }
}
