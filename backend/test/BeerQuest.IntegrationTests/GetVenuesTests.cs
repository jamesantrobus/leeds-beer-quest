using System.Net;
using System.Net.Http.Json;
using BeerQuest.Application.Contracts;
using BeerQuest.Application.Contracts.Responses;
using BeerQuest.IntegrationTests.Setup;
using Xunit;

namespace BeerQuest.IntegrationTests;

[Collection("Integration Tests")]
public class GetVenuesTests(WebTestFixture factory)
{
    private readonly HttpClient _client = factory.CreateClient();

    // NOTE: For demo purposes we're using the existing sqlite database and data for testing
    // Spinning up a new database with seeded test data would be more desirable and robust
    
    [Fact]
    public async Task DefaultQueryParamsReturnsAllVenues()
    {
        var response = await _client.GetAsync("/venues?minimumAverageRating=0");
        response.EnsureSuccessStatusCode();
        
        var venuesResponse = await response.Content.ReadFromJsonAsync<GetVenuesResponse>();

        Assert.NotNull(venuesResponse);
        Assert.Equal(199, venuesResponse.Venues.Count);
    }
    
    [Fact]
    public async Task VenuesAreReturnedInDescendingOrderByAverageRating()
    {
        var response = await _client.GetAsync("/venues?minimumAverageRating=0");
        response.EnsureSuccessStatusCode();
        
        var venuesResponse = await response.Content.ReadFromJsonAsync<GetVenuesResponse>();

        // manually order the results to give us something to assert against
        var expectedDescendingOrder = venuesResponse!.Venues.OrderByDescending(x => x.Rating.Average).ToList();
        
        Assert.Equal(expectedDescendingOrder, venuesResponse.Venues);
    }
    
    [Fact]
    public async Task FiltersVenuesByCategoryAndRating()
    {
        var response = await _client.GetAsync("/venues?category=Pub reviews&minimumAverageRating=4");
        response.EnsureSuccessStatusCode();
        
        var venuesResponse = await response.Content.ReadFromJsonAsync<GetVenuesResponse>();
        
        Assert.Equal(4, venuesResponse!.Venues.Count);
    }

    [Fact]
    public async Task GetVenuesReturnsExpectedVenueDetails()
    {
        var response = await _client.GetAsync("/venues?minimumAverageRating=0");
        response.EnsureSuccessStatusCode();
        
        var venuesResponse = await response.Content.ReadFromJsonAsync<GetVenuesResponse>();

        var exampleVenue = venuesResponse!.Venues.SingleOrDefault(x => x.Name == "Friends of Ham");
        Assert.NotNull(exampleVenue);

        var expectedResponse = new Venue("Friends of Ham", "Bar reviews",
            "Our 100th review is somewhere very special indeed. Are you a friend of ham yet?",
            "http://leedsbeer.info/wp-content/uploads/2013/08/IMG_20130818_165056.jpg",
            new Rating(5M, 4.5M, 3M, 4M, 4.125M),
            new Location("4 New Station Street, Leeds LS1 5DL", 53.7955399M, -1.545049M),
            new ContactDetails("0113 242 0275", "https://twitter.com/friendsofham"));
        
        Assert.Equal(expectedResponse, exampleVenue);
    }

    [Fact]
    public async Task ReturnsEmptyTwitterUriWhenNoHandleIsKnown()
    {
        var response = await _client.GetAsync("/venues?minimumAverageRating=0");
        response.EnsureSuccessStatusCode();
        
        var venuesResponse = await response.Content.ReadFromJsonAsync<GetVenuesResponse>();

        var exampleVenue = venuesResponse!.Venues.SingleOrDefault(x => x.Name == "Brooklyn Bar");
        Assert.NotNull(exampleVenue);
        Assert.Empty(exampleVenue.Contact.TwitterUri);
    }

    [Theory]
    [InlineData("", -1.0)]            // rating out of range (low) 
    [InlineData("", 6.0)]             // rating out of range (high)
    [InlineData("Invalid cat", 0.0)]  // invalid category
    public async Task ReturnsBadRequestWhenSearchParamsAreInvalid(string category, decimal minimumAverageRating)
    {
        var response = await _client.GetAsync($"/venues?category={category}&minimumAverageRating={minimumAverageRating}");
        
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}