using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DxNavigator.Api.Migrations
{
    /// <inheritdoc />
    public partial class MoveWorkflowSourceLinkToPublishedSnapshot : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserWorkflows_Workflows_SourceWorkflowId",
                table: "UserWorkflows");

            migrationBuilder.DropIndex(
                name: "IX_UserWorkflows_SourceWorkflowId",
                table: "UserWorkflows");

            migrationBuilder.AddColumn<int>(
                name: "SourceUserWorkflowId",
                table: "Workflows",
                type: "integer",
                nullable: true);

            migrationBuilder.Sql("""
                UPDATE "Workflows" AS published_workflow
                SET "SourceUserWorkflowId" = user_workflow."Id"
                FROM "UserWorkflows" AS user_workflow
                WHERE user_workflow."SourceWorkflowId" = published_workflow."Id";
                """);

            migrationBuilder.DropColumn(
                name: "SourceWorkflowId",
                table: "UserWorkflows");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_SourceUserWorkflowId",
                table: "Workflows",
                column: "SourceUserWorkflowId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_UserWorkflows_SourceUserWorkflowId",
                table: "Workflows",
                column: "SourceUserWorkflowId",
                principalTable: "UserWorkflows",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_UserWorkflows_SourceUserWorkflowId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_SourceUserWorkflowId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "SourceUserWorkflowId",
                table: "Workflows");

            migrationBuilder.AddColumn<int>(
                name: "SourceWorkflowId",
                table: "UserWorkflows",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserWorkflows_SourceWorkflowId",
                table: "UserWorkflows",
                column: "SourceWorkflowId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserWorkflows_Workflows_SourceWorkflowId",
                table: "UserWorkflows",
                column: "SourceWorkflowId",
                principalTable: "Workflows",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
