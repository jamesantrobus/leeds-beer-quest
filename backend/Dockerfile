FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# copy all backend files into the build container
COPY . ./

# restore packages and publish app
FROM build AS publish
RUN dotnet restore
RUN dotnet publish src/BeerQuest.Api/BeerQuest.Api.csproj --output /app/publish -c Release

# setup runtime container
FROM base AS final
ENV ASPNETCORE_ENVIRONMENT Production
WORKDIR /app
COPY --from=publish /app/publish .
RUN chmod u+w Database/beer.db
ENTRYPOINT ["dotnet", "BeerQuest.Api.dll"]