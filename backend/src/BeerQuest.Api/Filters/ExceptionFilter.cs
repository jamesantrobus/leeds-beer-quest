using FluentValidation;

namespace BeerQuest.Api.Filters;

// ReSharper disable once ClassNeverInstantiated.Global
public class ExceptionFilter : IEndpointFilter
{
    // catch exceptions thrown by endpoints and return appropriate HTTP status codes
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        try
        {
            var result = await next(context);
            return result;
        }
        catch (ValidationException ve)
        {
            return Results.Problem(string.Join(", ", ve.Errors), statusCode: 400);
        }
        catch (Exception)
        {
            return Results.Problem("Internal Server Error", statusCode: 500);
        }
    }
}
