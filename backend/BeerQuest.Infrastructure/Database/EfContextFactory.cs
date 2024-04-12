using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace BeerQuest.Infrastructure.Database;

/// <summary>
/// Supports Entity Framework at design-time (eg. EF CLI tooling)
/// </summary>
// ReSharper disable once UnusedType.Global
public class EfContextFactory : IDesignTimeDbContextFactory<EfContext>
{
    public EfContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<EfContext>();
        var dbPath = Path.Join(Directory.GetCurrentDirectory(), "Database", "beer.db");
        optionsBuilder.UseSqlite($"Data Source={dbPath}");
        
        return new EfContext(optionsBuilder.Options);
    }
}
