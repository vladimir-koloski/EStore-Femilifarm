using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FemiliFarmApp.DomainModels.Migrations
{
    public partial class Added_property_CreatedOn_forCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatenOn",
                table: "Carts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatenOn",
                table: "Carts");
        }
    }
}
