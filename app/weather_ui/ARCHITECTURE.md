# 🏗️ Weather UI - Architecture & Design Guide

Comprehensive technical documentation for the Weather UI project architecture.

---

## 📊 System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE LAYER                        │
│                   (Browser - Rendered HTML/CSS)                     │
│                                                                     │
│    ┌───────────────────────────────────────────────────────────┐  │
│    │                   Location Form                           │  │
│    │   ┌──────────────────────────────────────────────────┐   │  │
│    │   │  Input: City/Location Name                       │   │  │
│    │   │  Button: "Update Location"                       │   │  │
│    │   │  On Submit: GET /?location=USER_INPUT            │   │  │
│    │   └──────────────────────────────────────────────────┘   │  │
│    └───────────────────────────────────────────────────────────┘  │
│                                                                     │
│    ┌───────────────────────────────────────────────────────────┐  │
│    │                   Weather Display                         │  │
│    │   ┌──────────────────────────────────────────────────┐   │  │
│    │   │  Icon: Dynamic SVG (weather condition)           │   │  │
│    │   │  Location: City Name & Country                   │   │  │
│    │   │  Date: Current Date                              │   │  │
│    │   │  Temperature: High (Orange) / Low (Blue)         │   │  │
│    │   │  Condition: Text description                     │   │  │
│    │   └──────────────────────────────────────────────────┘   │  │
│    └───────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
              ▲                                             │
              │                                             │
              │          HTTP Response                      │
              │      (Rendered HTML Page)                  │
              │                                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                              │
│                   (Node.js + Fastify Server)                        │
│                      Port: 8098                                     │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                    HTTP Router                              │  │
│  │  GET / → Handles location-based weather requests           │  │
│  └──────────────────────┬──────────────────────────────────────┘  │
│                         │                                           │
│         ┌───────────────┼───────────────┐                          │
│         │               │               │                          │
│  ┌──────▼──────┐  ┌────▼────┐  ┌──────▼─────────┐                │
│  │   INPUT     │  │ LOCATION │  │    WEATHER    │                │
│  │ VALIDATION  │  │  SERVICE │  │   SERVICE     │                │
│  │             │  │          │  │               │                │
│  │ Zod Schema  │  │ Geocoding│  │ Open-Meteo    │                │
│  │   Check     │  │   API    │  │   API         │                │
│  └──────┬──────┘  └────┬─────┘  └──────┬────────┘                │
│         │              │               │                          │
│         └──────────────┼───────────────┘                          │
│                        │                                           │
│         ┌──────────────▼───────────────┐                          │
│         │   DATA AGGREGATION & MAPPING │                          │
│         │                              │                          │
│         │ • Merge location + weather   │                          │
│         │ • Map weather code to icon   │                          │
│         │ • Calculate high/low temps   │                          │
│         │ • Format dates               │                          │
│         └──────────────┬───────────────┘                          │
│                        │                                           │
│         ┌──────────────▼───────────────┐                          │
│         │   TEMPLATE RENDERING         │                          │
│         │   (Nunjucks)                 │                          │
│         │                              │                          │
│         │ • Render weather.njk         │                          │
│         │ • Inject data context        │                          │
│         │ • Apply CSS styling          │                          │
│         │ • Include SVG assets         │                          │
│         └──────────────┬───────────────┘                          │
│                        │                                           │
│         ┌──────────────▼───────────────┐                          │
│         │   STATIC FILE SERVER         │                          │
│         │   (@fastify/static)          │                          │
│         │                              │                          │
│         │ Serves:                      │                          │
│         │  • styles.css                │                          │
│         │  • SVG icons                 │                          │
│         │  • Other static assets       │                          │
│         └──────────────┬───────────────┘                          │
│                        │                                           │
│         ┌──────────────▼───────────────┐                          │
│         │   ERROR HANDLING             │                          │
│         │                              │                          │
│         │ On Error:                    │                          │
│         │  • Log error                 │                          │
│         │  • Render get_started.njk    │                          │
│         │  • Show user-friendly msg    │                          │
│         └──────────────────────────────┘                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
              ▲                                             │
              │                                             │
              │          HTTP Requests                      │
              │                                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       EXTERNAL APIs                                 │
│                                                                     │
│  ┌────────────────────────┐  ┌────────────────────────────────┐   │
│  │  GEOCODE MAPS API      │  │  OPEN-METEO WEATHER API        │   │
│  │                        │  │                                │   │
│  │ Endpoint:              │  │ Endpoint:                      │   │
│  │ geocode.maps.co/search │  │ api.open-meteo.com/v1/forecast│   │
│  │                        │  │                                │   │
│  │ Purpose:               │  │ Purpose:                       │   │
│  │ Convert location name  │  │ Fetch weather data             │   │
│  │ to coordinates         │  │                                │   │
│  │                        │  │ Returns:                       │   │
│  │ Returns:               │  │ • Current conditions           │   │
│  │ • lat, lon             │  │ • Hourly temperature           │   │
│  │ • display_name         │  │ • Weather code                 │   │
│  │                        │  │ • Wind data                    │   │
│  │ Auth: Bearer Token     │  │ • Day/Night indicator          │   │
│  └────────────────────────┘  └────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
              ▲                                             │
              │                                             │
              │      HTTP Response (JSON)                   │
              │                                             ▼
            User Input                                  External
            (Location)                                  Services
```

---

## 🔄 Request-Response Flow

```
USER ACTION: Enter "London" and click "Update Location"
       ║
       ▼
┌──────────────────────────────────────────┐
│ Browser sends:                           │
│ GET /?location=London                    │
└────────────────────────┬─────────────────┘
                         ║
                         ▼
            ┌────────────────────────────┐
            │ STEP 1: Input Validation   │
            │                            │
            │ • Parse query params       │
            │ • Extract "location"       │
            │ • Zod validation           │
            │ • Check non-empty string   │
            │                            │
            │ ✓ Valid → Continue         │
            │ ✗ Invalid → Error Page     │
            └────────────┬───────────────┘
                         ║
                         ▼
      ┌────────────────────────────────────┐
      │ STEP 2: Fetch Location Coordinates │
      │                                    │
      │ Call: fetchLocationData()          │
      │                                    │
      │ Request to Geocode API:            │
      │ GET geocode.maps.co/search?q=      │
      │     London                         │
      │ Headers: Authorization Bearer...   │
      │                                    │
      │ Response:                          │
      │ [                                  │
      │   {                                │
      │     lat: "51.5073219"              │
      │     lon: "-0.1276474"              │
      │     display_name: "London..."      │
      │   }                                │
      │ ]                                  │
      │                                    │
      │ Parse with LocationInfoSchema      │
      │                                    │
      │ ✓ Success → Extract data           │
      │ ✗ Failure → Error Page             │
      └────────────┬─────────────────────┘
                   ║
                   ▼
   ┌─────────────────────────────────────┐
   │ STEP 3: Fetch Weather Data          │
   │                                     │
   │ Call: fetchWeatherData()            │
   │                                     │
   │ Request to Open-Meteo API:          │
   │ GET api.open-meteo.com/v1/forecast? │
   │     latitude=51.5073219&            │
   │     longitude=-0.1276474&           │
   │     hourly=temperature_2m&          │
   │     temperature_unit=celsius&       │
   │     current_weather=true&           │
   │     forecast_days=1                 │
   │                                     │
   │ Response:                           │
   │ {                                   │
   │   current_weather: {                │
   │     temperature: 12.5               │
   │     weathercode: 2                  │
   │     is_day: 1                       │
   │     time: "2024-11-22T16:00"        │
   │   },                                │
   │   hourly: {                         │
   │     temperature_2m: [5.2, 6.1, ...]│
   │   }                                 │
   │ }                                   │
   │                                     │
   │ Parse with schema                   │
   │ Create CurrentWeather object        │
   │                                     │
   │ ✓ Success → Extract data            │
   │ ✗ Failure → Error Page              │
   └───────────┬──────────────────────┘
               ║
               ▼
    ┌──────────────────────────────────┐
    │ STEP 4: Transform & Map Data     │
    │                                  │
    │ • Create weather object          │
    │ • Calculate highTemp()            │
    │   = max(hourlyTemp)              │
    │ • Calculate lowTemp()             │
    │   = min(hourlyTemp)              │
    │ • Get condition description      │
    │   from weatherCode               │
    │ • Map code to icon path          │
    │   weatherCodeToImage(2)          │
    │   → "/static/img/cloudy.svg"     │
    │                                  │
    │ Result Object:                   │
    │ {                                │
    │   location: "London, UK"         │
    │   currentDate: "Nov 22, 2024"    │
    │   weather: {                     │
    │     temperature: 12.5            │
    │     highTemp: 15                 │
    │     lowTemp: 5                   │
    │     condition: "Partly cloudy"   │
    │     conditionImg: "/static/..."  │
    │   }                              │
    │ }                                │
    └───────────┬──────────────────────┘
                ║
                ▼
     ┌────────────────────────────────┐
     │ STEP 5: Render Template        │
     │                                │
     │ Template: weather.njk          │
     │                                │
     │ Nunjucks renders:              │
     │ • Extends main.njk             │
     │ • Injects data context         │
     │ • Renders HTML                 │
     │ • Applies Tailwind CSS         │
     │                                │
     │ Template Variables:            │
     │ • location                     │
     │ • currentDate                  │
     │ • weather.*                    │
     │                                │
     │ Outputs:                       │
     │ Full HTML page                 │
     └───────────┬──────────────────────┘
                 ║
                 ▼
      ┌──────────────────────────────┐
      │ STEP 6: Serve Response       │
      │                              │
      │ Set Headers:                 │
      │ Content-Type:                │
      │   text/html; charset=utf-8   │
      │                              │
      │ Send HTML to browser         │
      └───────────┬──────────────────┘
                  ║
                  ▼
        ┌────────────────────────────┐
        │ STEP 7: Browser Rendering  │
        │                            │
        │ • Parse HTML               │
        │ • Load CSS (styles.css)    │
        │ • Load SVG icons           │
        │ • Render page              │
        │                            │
        │ USER SEES:                 │
        │ ✓ Location name            │
        │ ✓ Weather icon             │
        │ ✓ Condition text           │
        │ ✓ Temperatures             │
        │ ✓ Date                     │
        │ ✓ Search form              │
        └────────────────────────────┘
```

---

## 🗂️ Detailed File Structure & Responsibilities

```
src/backend/
│
├── server.ts
│   ├── Purpose: Main application entry point & HTTP server
│   ├── Responsibilities:
│   │   ├── Initialize Fastify server
│   │   ├── Configure static file serving (/dist)
│   │   ├── Define GET / route handler
│   │   ├── Coordinate API calls (location + weather)
│   │   ├── Render templates
│   │   └── Handle errors
│   ├── Key Functions:
│   │   ├── weatherCodeToImage(code: number)
│   │   │   └── Maps WMO codes to SVG icons
│   │   └── server.get("/", handler)
│   │       └── Main request handler
│   └── Dependencies:
│       ├── fastify
│       ├── location.ts (fetchLocationData)
│       ├── weatherapi.ts (fetchWeatherData)
│       └── nunjucks
│
├── weatherapi.ts
│   ├── Purpose: Weather API client & domain logic
│   ├── Responsibilities:
│   │   ├── Define weather API schemas
│   │   ├── Fetch weather data from Open-Meteo
│   │   ├── Parse and validate responses
│   │   ├── Transform to domain objects
│   │   └── Calculate derived values
│   ├── Exports:
│   │   ├── weatherCodes: Record<number, string>
│   │   │   └── Maps WMO codes to descriptions
│   │   ├── CurrentWeatherApiResponse: Type
│   │   │   └── API response structure
│   │   ├── CurrentWeather: Class
│   │   │   ├── temperature: Temperature
│   │   │   ├── weatherCode: number
│   │   │   ├── is_day: boolean
│   │   │   ├── time: string
│   │   │   ├── hourlyTemp: number[]
│   │   │   ├── condition(): string
│   │   │   ├── highTemp(): number
│   │   │   └── lowTemp(): number
│   │   └── fetchWeatherData(): Promise<CurrentWeather>
│   └── Dependencies:
│       ├── axios
│       └── zod
│
├── location.ts
│   ├── Purpose: Location/geocoding API client
│   ├── Responsibilities:
│   │   ├── Define location schemas
│   │   ├── Fetch location data from Geocode API
│   │   ├── Parse and validate responses
│   │   └── Return structured location info
│   ├── Exports:
│   │   ├── LocationInfo: Type
│   │   │   ├── lat: string
│   │   │   ├── lon: string
│   │   │   └── display_name: string
│   │   └── fetchLocationData(): Promise<LocationInfo>
│   └── Dependencies:
│       ├── axios
│       ├── zod
│       └── dotenv
│
├── templates/
│   ├── main.njk
│   │   ├── Purpose: Base layout template
│   │   ├── Content:
│   │   │   ├── DOCTYPE
│   │   │   ├── <html> structure
│   │   │   ├── Include head.njk
│   │   │   └── Define content block
│   │   └── Variables: Provided by child templates
│   │
│   ├── weather.njk
│   │   ├── Purpose: Weather display template
│   │   ├── Content:
│   │   │   ├── Extends main.njk
│   │   │   ├── Weather icon section
│   │   │   ├── Location & date display
│   │   │   ├── Temperature display
│   │   │   ├── Weather condition text
│   │   │   └── Location search form
│   │   └── Variables:
│   │       ├── location: string
│   │       ├── currentDate: string
│   │       ├── weather.conditionImg: string (path)
│   │       ├── weather.condition: string
│   │       ├── weather.highTemp: number
│   │       ├── weather.lowTemp: number
│   │       └── weather.temperature.unit: string
│   │
│   ├── get_started.njk
│   │   ├── Purpose: Initial/error page
│   │   ├── Content:
│   │   │   ├── Extends main.njk
│   │   │   ├── Welcome message
│   │   │   └── Instructions
│   │   └── Variables: None required
│   │
│   ├── head.njk
│   │   ├── Purpose: HTML head partial
│   │   ├── Content:
│   │   │   ├── <meta> tags
│   │   │   ├── <title>
│   │   │   ├── Link to styles.css
│   │   │   └── Other head elements
│   │   └── Variables: environment
│   │
│   └── index.css
│       ├── Purpose: Base CSS with Tailwind directives
│       ├── Content:
│       │   ├── @tailwind directives
│       │   ├── Custom CSS (if any)
│       │   └── Compiled by Tailwind
│       └── Output: dist/styles.css
│
├── weatherapi.test.ts
│   ├── Purpose: Test weather API functionality
│   ├── Coverage:
│   │   ├── Schema validation
│   │   ├── API response parsing
│   │   ├── Error handling
│   │   └── Data transformation
│   └── Dependencies:
│       ├── jest
│       └── axios-mock-adapter
│
└── location.test.ts
    ├── Purpose: Test location API functionality
    ├── Coverage:
    │   ├── Schema validation
    │   ├── API response parsing
    │   ├── Error handling
    │   └── Coordinate extraction
    └── Dependencies:
        ├── jest
        └── axios-mock-adapter

assets/static/weather-cions/reshot/
├── clear.svg (weather code 0, 1)
├── cloudy.svg (weather code 2)
├── overcast.svg (weather code 3)
├── fog.svg (weather code 45, 48)
├── drizzle.svg (weather code 51-57)
├── rain.svg (weather code 61-67, 80-82)
├── snow.svg (weather code 71-77, 85-86)
├── thunderstorm.svg (weather code 95-99)
└── info.svg (default fallback)

dist/ (Generated on build)
├── styles.css (compiled Tailwind)
└── static/
    └── img/ (copied SVG icons)
        ├── clear.svg
        ├── cloudy.svg
        ├── overcast.svg
        ├── fog.svg
        ├── drizzle.svg
        ├── rain.svg
        ├── snow.svg
        ├── thunderstorm.svg
        └── info.svg
```

---

## 🔀 Data Models & Type Definitions

```typescript
// Location Data
interface LocationInfo {
  lat: string;        // Latitude coordinate
  lon: string;        // Longitude coordinate
  display_name: string; // Formatted location name
}

// Temperature Data
interface Temperature {
  value: number;      // Temperature value
  unit: string;       // Unit (°C, °F, etc)
}

// Current Weather Data
class CurrentWeather {
  temperature: Temperature;      // Current temperature
  weatherCode: number;            // WMO weather code (0-99)
  is_day: boolean;               // Day/night indicator
  time: string;                  // ISO timestamp
  hourlyTemp: number[];          // Array of hourly temps

  // Methods
  condition(): string {           // Human-readable condition
    return weatherCodes[this.weatherCode];
  }

  lowTemp(): number {             // Calculate daily low
    return Math.min(...this.hourlyTemp);
  }

  highTemp(): number {            // Calculate daily high
    return Math.max(...this.hourlyTemp);
  }
}

// Rendered Data Structure
interface WeatherPageData {
  location: string;              // Location display name
  currentDate: string;           // Formatted date
  weather: {
    temperature: Temperature;    // Raw temperature
    highTemp: number;            // Daily high
    lowTemp: number;             // Daily low
    condition: string;           // Description
    conditionImg: string;        // Icon path
  };
  environment: string;           // "development" or "production"
}

// API Request Objects (Zod Schemas)
const LocationInfoSchema = z.object({
  lat: z.string(),
  lon: z.string(),
  display_name: z.string(),
});

const currentWeatherApiResponseSchema = z.object({
  current_weather: z.object({
    time: z.string(),
    interval: z.number(),
    temperature: z.number(),
    windspeed: z.number(),
    winddirection: z.number(),
    is_day: z.number(),
    weathercode: z.number(),
  }),
  hourly_units: z.object({
    time: z.string(),
    temperature_2m: z.string(),
  }),
  hourly: z.object({
    temperature_2m: z.array(z.number()),
  }),
});
```

---

## ⚙️ Configuration & Environment

```
Environment: development

Configuration Files:
├── .env
│   └── GEOCODE_API_KEY=<bearer-token>
│       NODE_ENV=development
│
├── tsconfig.json
│   ├── extends: ../../tsconfig.json
│   ├── target: ES2020
│   ├── module: commonjs
│   ├── lib: ES2020
│   └── strict: true
│
├── tailwind.config.js
│   ├── content: ["./src/**/*.{js,ts,jsx,tsx,njk,html}"]
│   ├── theme: {...}
│   └── plugins: [@tailwindcss/typography]
│
├── jest.config.js
│   ├── preset: "ts-jest"
│   ├── testEnvironment: "node"
│   └── coverage: {...}
│
└── package.json
    ├── scripts:
    │   ├── dev: Run all dev processes
    │   ├── build: Copy assets
    │   ├── dev:tailwind: Watch Tailwind
    │   ├── dev:backend: Run server
    │   ├── dev:frontend: Build frontend
    │   ├── dev:reload: Live reload
    │   ├── test: Run Jest
    │   ├── lint: Run ESLint
    │   └── check: Custom checks
    │
    ├── dependencies:
    │   ├── fastify
    │   ├── @fastify/formbody
    │   ├── @fastify/static
    │   ├── axios
    │   ├── nunjucks
    │   ├── zod
    │   └── dotenv
    │
    └── devDependencies:
        ├── typescript
        ├── ts-node
        ├── nodemon
        ├── jest & ts-jest
        ├── tailwindcss
        ├── concurrently
        ├── eslint
        └── ...
```

---

## 🚀 Deployment Architecture

```
Production Environment:
┌─────────────────────────────────────┐
│   Docker Container / VM             │
│   Node.js 18.9.1+                  │
│                                     │
│   Environment Variables:            │
│   ├── GEOCODE_API_KEY (secrets)     │
│   ├── NODE_ENV=production           │
│   └── PORT=8098                     │
│                                     │
│   Build Process:                    │
│   ├── npm install                   │
│   ├── npm run build                 │
│   ├── npm run dev:tailwind           │
│   └── npm start (or pm2)            │
│                                     │
│   Process Management:               │
│   ├── pm2 / systemd / Docker        │
│   ├── Auto-restart on failure       │
│   └── Log aggregation               │
│                                     │
│   Monitoring:                       │
│   ├── Health checks                 │
│   ├── Error logging                 │
│   ├── Performance metrics           │
│   └── Uptime tracking               │
└─────────────────────────────────────┘
         │                   │
         ▼                   ▼
    ┌─────────┐         ┌──────────┐
    │  CDN    │         │  Reverse │
    │  Cache  │         │  Proxy   │
    │         │         │  (Nginx) │
    └─────────┘         └──────────┘
         │                   │
         └───────────┬───────┘
                     ▼
            ┌───────────────────┐
            │  Load Balancer    │
            │  (if scaling)     │
            └───────────────────┘
                     │
                     ▼
            ┌───────────────────┐
            │  Fastify Server   │
            │  Port 8098        │
            └───────────────────┘
```

---

## 🔐 Security Architecture

```
Security Layers:
├── Input Validation
│   ├── Location input validated with Zod
│   ├── API responses validated with schemas
│   └── Type safety with TypeScript
│
├── API Authentication
│   ├── Geocode API: Bearer token in .env
│   ├── Weather API: No auth required
│   └── Never expose secrets in code
│
├── Error Handling
│   ├── Errors caught and logged
│   ├── Generic messages shown to users
│   ├── No sensitive data exposed
│   └── Fallback pages on errors
│
├── HTTP Headers
│   ├── Content-Type: text/html; charset=utf-8
│   ├── X-Frame-Options (can be added)
│   └── X-Content-Type-Options (can be added)
│
└── Static Files
    ├── Served from /dist only
    ├── No direct access to source
    └── Compiled CSS & copied assets
```

---

## 📈 Performance Optimization

```
Current Optimizations:
├── SVG Icons
│   ├── Lightweight & scalable
│   ├── No raster images
│   └── Responsive on all devices
│
├── CSS
│   ├── Tailwind utility-first (small)
│   ├── Purged unused styles
│   └── Minimal CSS sent to browser
│
├── Caching Opportunities (Future)
│   ├── Redis for location cache
│   ├── Browser caching headers
│   ├── API response caching
│   └── CDN for static assets
│
├── Code Quality
│   ├── TypeScript for early errors
│   ├── Zod for runtime validation
│   ├── Type-safe throughout
│   └── No runtime surprises
│
└── Build Optimization
    ├── Tree-shaking unused code
    ├── Minified production builds
    ├── Source maps for debugging
    └── Lazy loading opportunities
```

---

**Last Updated:** November 22, 2024
