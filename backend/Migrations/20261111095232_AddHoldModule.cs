using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace schoolAdmission.Migrations
{
    /// <inheritdoc />
    public partial class AddHoldModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "holds",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    status = table.Column<string>(type: "text", nullable: false),
                    classId = table.Column<Guid>(type: "uuid", nullable: false),
                    expiresAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    studentId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_holds", x => x.id);
                    table.ForeignKey(
                        name: "FK_holds_classes_classId",
                        column: x => x.classId,
                        principalTable: "classes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_holds_classId",
                table: "holds",
                column: "classId");

            migrationBuilder.CreateIndex(
                name: "IX_holds_status",
                table: "holds",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "IX_holds_studentId",
                table: "holds",
                column: "studentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "holds");
        }
    }
}
