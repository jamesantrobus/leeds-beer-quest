using BeerQuest.Application.Services.Validators;
using BeerQuest.Domain.Repositories;
using BeerQuest.Infrastructure.Database;
using BeerQuest.Infrastructure.Repositories;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BeerQuest.Infrastructure.DI;

public static class Setup
{
    public static void AddDbContext(this IServiceCollection services, string contentRootPath, string environmentName)
    {
        var dbPath = environmentName == "Production"
            ? Path.Join(contentRootPath, "Database", "beer.db")
            : Path.Join(contentRootPath, "..", "BeerQuest.Infrastructure", "Database", "beer.db");
        
        services.AddDbContext<EfContext>(opt =>
            opt.UseSqlite($"Data Source={dbPath}"));
    }
    
    public static void RegisterApplicationDependencies(this IServiceCollection services)
    {
        // register validators
        services.AddValidatorsFromAssemblyContaining<GetVenuesRequestValidator>();

        // register infrastructure
        services.AddScoped<IVenueRepository, VenueRepository>();
    }
}