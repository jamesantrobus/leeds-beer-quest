using Microsoft.EntityFrameworkCore;

namespace BeerQuest.Infrastructure.Database;

public class EfContext(DbContextOptions<EfContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
