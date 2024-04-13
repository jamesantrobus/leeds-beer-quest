using BeerQuest.Domain.Entities;

namespace BeerQuest.Domain.Repositories;

public interface IVenueRepository
{
    Task<IList<Venue>> Search(string? category, decimal? minimumAverageRating);
}