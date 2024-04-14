using BeerQuest.Application.Contracts;
using BeerQuest.Application.Contracts.Requests;
using BeerQuest.Application.Contracts.Responses;
using BeerQuest.Domain.Repositories;
using FluentValidation;
using MediatR;

namespace BeerQuest.Application.Services.Handlers;

public class GetVenuesHandler(IValidator<GetVenuesRequest> requestValidator, IVenueRepository venueRepository) 
    : IRequestHandler<GetVenuesRequest, GetVenuesResponse>
{
    public async Task<GetVenuesResponse> Handle(GetVenuesRequest request, CancellationToken cancellationToken)
    {
        await requestValidator.ValidateAndThrowAsync(request, cancellationToken: cancellationToken);
        
        var venues = await venueRepository.Search(request.Category, request.MinimumAverageRating);
        var mappedVenues = venues
            .Select(MapToContract)
            .OrderByDescending(x => x.Rating.Average) // sqlite doesn't support ordering of REAL types, so ordering in-memory here
            .ToList();

        return new GetVenuesResponse(mappedVenues);
    }

    private Venue MapToContract(Domain.Entities.Venue x)
    {
        var rating = new Rating(x.Rating.Beer, x.Rating.Atmosphere, x.Rating.Amenities, x.Rating.Value, x.Rating.Average);
        var location = new Location(x.Location.Address, x.Location.Latitude, x.Location.Longitude);
        var contact = new ContactDetails(x.ContactDetails.PhoneNumber ?? "", 
            !string.IsNullOrEmpty(x.ContactDetails.TwitterHandle) ? $"https://twitter.com/{x.ContactDetails.TwitterHandle}" : "");

        return new Venue(x.Name, x.Category, x.Description, x.ThumbnailUrl, rating, location, contact);
    }
}