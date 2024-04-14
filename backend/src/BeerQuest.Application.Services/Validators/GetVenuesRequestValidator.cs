using BeerQuest.Application.Contracts.Requests;
using FluentValidation;

namespace BeerQuest.Application.Services.Validators;

// ReSharper disable once UnusedType.Global
public class GetVenuesRequestValidator : AbstractValidator<GetVenuesRequest>
{
    public GetVenuesRequestValidator()
    {
        RuleFor(x => x.MinimumAverageRating)
            .InclusiveBetween(0, 5)
            .WithMessage("Minimum Average Rating should be between 0 and 5");

        RuleFor(x => x.Category)
            .Must(cat => cat is null or "" or "Pub reviews" or "Bar reviews")
            .WithMessage("Category must be [Pub reviews], [Bar reviews] or empty");
    }
}
