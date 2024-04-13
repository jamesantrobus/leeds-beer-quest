using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeerQuest.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddVenues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Venues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    Category = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    ThumbnailUrl = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    Rating_Beer = table.Column<decimal>(type: "REAL", precision: 2, scale: 1, nullable: false),
                    Rating_Atmosphere = table.Column<decimal>(type: "REAL", precision: 2, scale: 1, nullable: false),
                    Rating_Amenities = table.Column<decimal>(type: "REAL", precision: 2, scale: 1, nullable: false),
                    Rating_Value = table.Column<decimal>(type: "REAL", precision: 2, scale: 1, nullable: false),
                    Location_Address = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    Location_Latitude = table.Column<decimal>(type: "REAL", precision: 10, scale: 8, nullable: false),
                    Location_Longitude = table.Column<decimal>(type: "REAL", precision: 10, scale: 8, nullable: false),
                    ContactDetails_PhoneNumber = table.Column<string>(type: "TEXT", maxLength: 15, nullable: true),
                    ContactDetails_TwitterHandle = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venues", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Venues");
        }
    }
}
