# Beer Quest

This application helps you find a place to drink in Leeds based on the [Leeds Beer Quest](https://datamillnorth.org/dataset/e1dzd/leeds-beer-quest) dataset.

The app uses React with NextJS to serve the frontend and a backend API.

![App Screenshot](docs/app-screenshot.png)

## Prerequisites

- Node v18 or above.

## Getting Started

- Install dependencies with `npm install`.
- Provide a [Mapbox](https://www.mapbox.com/) token in `.env` (for demo purposes this may have been provided to you).
- Run the development server with `npm run dev` and browse to [http://localhost:3000](http://localhost:3000/).
- Formatting is provided by prettier and can be ran with `npm run format`.

## Tests

The app has three sets of tests:

- Backend tests to provide coverage of the API endpoint. These use `vitest` and can be ran with `npm run test`.
- Frontend component tests to test components in isolation and through specific scenarios. Run using `npm run cypress:run:component`.
- Frontend E2E tests to mimick the user journey through the app. Run using `npm run cypress:run`. **Note:** The dev server must be running first and the Mapbox token must be set (see prerequisites).

## Known Issues

- The app does not render well at mobile viewport sizes. For best results use a tablet or desktop.

## Attribution

- Leeds Beer Quest [dataset](https://drive.google.com/file/d/1o5JTtFUHcBAjH47z4i_eZrFdyXvSzY_S/view).
- Marker icons created by [André Luiz Gollo - Flaticon](https://www.flaticon.com/free-icons/marker).

dotnet ef migrations add AddVenues --project BeerQuest.Infrastructure/BeerQuest.Infrastructure.csproj

dotnet ef database update --project BeerQuest.Infrastructure/BeerQuest.Infrastructure.csproj
