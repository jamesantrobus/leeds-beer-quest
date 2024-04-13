namespace BeerQuest.Application.Contracts;

public record Venue(string Name, string Category, string Description, string ThumbnailUri, 
    Rating Rating, Location Location, ContactDetails Contact);

public record Rating(decimal Beer, decimal Atmosphere, decimal Amenities, decimal Value, decimal Average);

public record Location(string Address, decimal Latitude, decimal Longitude);

public record ContactDetails(string Phone, string TwitterUri);
