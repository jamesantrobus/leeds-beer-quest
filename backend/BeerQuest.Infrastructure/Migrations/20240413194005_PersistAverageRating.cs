using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeerQuest.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PersistAverageRating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Rating_Average",
                table: "Venues",
                type: "REAL",
                precision: 2,
                scale: 1,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.Sql("UPDATE Venues SET Rating_Average = (Rating_Beer + Rating_Value + Rating_Atmosphere + Rating_Amenities) / 4.0;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating_Average",
                table: "Venues");
        }
    }
}
