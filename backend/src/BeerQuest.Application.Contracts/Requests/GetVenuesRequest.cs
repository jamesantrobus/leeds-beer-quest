using BeerQuest.Application.Contracts.Responses;
using MediatR;

namespace BeerQuest.Application.Contracts.Requests;

public record GetVenuesRequest(string? Category, decimal? MinimumAverageRating) 
    : IRequest<GetVenuesResponse>;