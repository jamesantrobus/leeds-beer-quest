using BeerQuest.Domain.Entities;
using BeerQuest.Domain.Repositories;
using BeerQuest.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace BeerQuest.Infrastructure.Repositories;

public class VenueRepository(EfContext context) : IVenueRepository
{
    public async Task<IList<Venue>> Search(string? category, decimal? minimumAverageRating) =>
        await context.Venues
            .Where(x => x.Category != "Closed venues")
            .Where(x => string.IsNullOrEmpty(category) || x.Category == category)
            .Where(x => x.Rating.Average >= minimumAverageRating)
            .ToListAsync();
}