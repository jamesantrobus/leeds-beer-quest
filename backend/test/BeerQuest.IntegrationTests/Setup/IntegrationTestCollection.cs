using Xunit;

namespace BeerQuest.IntegrationTests.Setup;

/// <summary>
/// XUnit Collection Definition
/// Place to apply [CollectionDefinition] and all the ICollectionFixture<> interfaces.
/// </summary>
[CollectionDefinition("Integration Tests")]
public class IntegrationTestCollection : ICollectionFixture<WebTestFixture>
{

}
