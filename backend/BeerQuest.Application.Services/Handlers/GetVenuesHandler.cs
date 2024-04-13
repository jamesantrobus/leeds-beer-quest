using BeerQuest.Application.Contracts.Requests;
using BeerQuest.Application.Contracts.Responses;
using MediatR;

namespace BeerQuest.Application.Services.Handlers;

public class GetVenuesHandler : IRequestHandler<GetVenuesRequest, GetVenuesResponse>
{
    public Task<GetVenuesResponse> Handle(GetVenuesRequest request, CancellationToken cancellationToken)
    {
        return Task.FromResult(new GetVenuesResponse(){});
    }
}