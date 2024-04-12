using BeerQuest.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BeerQuest.Infrastructure.Database;

public class EfContext(DbContextOptions<EfContext> options) : DbContext(options)
{
    public DbSet<Venue> Venues { get; set; } = null!;
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Venue>(venue =>
        {
            venue.ToTable("Venues");
            venue.HasKey(b => b.Id);

            venue.Property(b => b.Name).HasMaxLength(10);
            venue.Property(b => b.Category).HasMaxLength(255);
            venue.Property(b => b.Description).HasMaxLength(255);
            venue.Property(b => b.ThumbnailUrl).HasMaxLength(255);
        
            venue.OwnsOne(x => x.Rating, rating =>
            {
                rating.Property(x => x.Beer).HasPrecision(2, 1);
                rating.Property(x => x.Atmosphere).HasPrecision(2, 1);
                rating.Property(x => x.Amenities).HasPrecision(2, 1);
                rating.Property(x => x.Value).HasPrecision(2, 1);
            });
            
            venue.OwnsOne(x => x.ContactDetails, contact =>
            {
                contact.Property(x => x.PhoneNumber).HasMaxLength(15);
                contact.Property(x => x.TwitterHandle).HasMaxLength(50);
            });
        
            venue.OwnsOne(x => x.Location, location =>
            {
                location.Property(x => x.Address).HasMaxLength(255);
                location.Property(x => x.Latitude).HasPrecision(10, 8);
                location.Property(x => x.Longitude).HasPrecision(10, 8);
            });
        });
    }
}
