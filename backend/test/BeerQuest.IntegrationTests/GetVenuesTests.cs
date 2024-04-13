using System.Net.Http.Json;
using BeerQuest.Application.Contracts.Responses;
using BeerQuest.IntegrationTests.Setup;
using Xunit;

namespace BeerQuest.IntegrationTests;

[Collection("Integration Tests")]
public class GetVenuesTests(WebTestFixture factory)
{
    private readonly HttpClient _client = factory.CreateClient();

    [Fact]
    public async Task GetVenuesWithDefaultQueryParamsReturnsAllVenues()
    {
        var response = await _client.GetAsync("/venues?minimumAverageRating=0");
        response.EnsureSuccessStatusCode();
        
        var venuesResponse = await response.Content.ReadFromJsonAsync<GetVenuesResponse>();

        Assert.NotNull(venuesResponse);
        Assert.Equal(199, venuesResponse.Venues.Count);
    }
}