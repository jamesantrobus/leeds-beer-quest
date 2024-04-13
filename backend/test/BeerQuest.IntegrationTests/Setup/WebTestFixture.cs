using BeerQuest.Api;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace BeerQuest.IntegrationTests.Setup;

// ReSharper disable once ClassNeverInstantiated.Global
public class WebTestFixture : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
    }
}
