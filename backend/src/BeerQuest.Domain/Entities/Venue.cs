using BeerQuest.Domain.ValueTypes;

namespace BeerQuest.Domain.Entities;

public class Venue
{
    // EF doesn't support a constructor with mapped types here 
    
    public int Id { get; init; }
    public required string Name { get; init; }
    public required string Category { get; init; }
    public required string Description { get; init; }
    public required string ThumbnailUrl { get; init; }
    
    public required Rating Rating { get; init; }
    public required Location Location { get; init; }
    public required ContactDetails ContactDetails { get; init; }
}
