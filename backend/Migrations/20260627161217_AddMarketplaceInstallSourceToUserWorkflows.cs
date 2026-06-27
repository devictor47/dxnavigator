using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DxNavigator.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddMarketplaceInstallSourceToUserWorkflows : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserWorkflows_Workflows_SourceWorkflowId",
                table: "UserWorkflows");

            migrationBuilder.DropIndex(
                name: "IX_UserWorkflows_SourceWorkflowId",
                table: "UserWorkflows");

            migrationBuilder.DropColumn(
                name: "SourceWorkflowId",
                table: "UserWorkflows");
        }
    }
}
