# Weather CLI

A small TypeScript command-line app that looks up a place by name and prints its
current weather. It uses [geocode.maps.co](https://geocode.maps.co/) to convert
the place name to coordinates, then [Open-Meteo](https://open-meteo.com/) to
fetch the weather.

## Requirements

- Node.js 18.9.1 or later
- pnpm
- A geocode.maps.co API key

The geocoding request requires `GEOCODE_API_KEY`. Open-Meteo is called without
an API key by this project.

## Set up

From the repository root, install this app's dependencies:

```sh
cd app/weather_cli
pnpm install
```

Set the geocoding key in the environment. To use a local `.env` file, create
`app/weather_cli/.env` with:

```dotenv
GEOCODE_API_KEY=your_geocode_maps_co_api_key
```

Keep the key private and do not commit `.env`. `dotenv` loads this file when
the CLI starts.

## Run

Pass one place name as the positional argument. Quote names containing spaces:

```sh
pnpm run weather -- "New York"
```

The CLI prints the resolved place and its current temperature, wind, and
weather condition. It returns a non-zero exit code if the argument is missing,
the place cannot be resolved, or an API request fails.

## Project structure

- `weather.ts` is the CLI entry point. It validates the argument and coordinates
  the geocoding and weather requests.
- `location.ts` calls geocode.maps.co and returns the first matching place's
  name and coordinates.
- `weatherapi.ts` calls Open-Meteo, maps the current conditions into
  `CurrentWeather`, and formats the result for display.

## Development checks

Run these from `app/weather_cli`:

```sh
pnpm run typecheck
pnpm run lint
```

## Scaling the project

The current app is intentionally small: it handles one location and displays
current conditions in the terminal. A practical growth path is:

1. **Expand the CLI interface.** Add validated options for units, forecast
   length, and output format (for example, human-readable text or JSON).
2. **Separate provider boundaries.** Define typed geocoder and weather-provider
   interfaces so API-specific code can be replaced or mocked without changing
   the CLI or weather formatting.
3. **Improve reliability.** Add request timeouts, carefully bounded retries for
   transient failures, response validation, and clear messages for rate limits
   and unavailable services.
4. **Add tests.** Cover argument parsing, API-response mapping, formatting, and
   error handling with mocked HTTP responses; keep tests independent of live
   weather services and API keys.
5. **Add useful features when needed.** Forecasts, saved locations, and
   short-lived caching can reduce repeated requests. Keep cached weather
   freshness explicit because conditions change over time.
6. **Prepare for distribution.** Once the interface is stable, add CI checks
   for linting, type checking, and tests, then package the CLI with a documented
   installation and configuration flow.

These are future improvements, not features currently implemented.