using BeerQuest.Application.Contracts.Requests;
using BeerQuest.Application.Services.Handlers;
using BeerQuest.Infrastructure.Database;
using BeerQuest.Infrastructure.DI;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// setup DB
builder.Services.AddDbContext(builder.Environment.ContentRootPath);

builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(GetVenuesHandler).Assembly));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/venues", (string? category, decimal? minimumAverageRating, IMediator mediator) 
        => mediator.Send(new GetVenuesRequest(category, minimumAverageRating)))
    .WithName("GetVenues")
    .WithOpenApi();

// migrate the database (for demo purposes, not recommended for prod)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<EfContext>();
    db.Database.EnsureCreated();
    db.Database.Migrate();
}

app.Run();
