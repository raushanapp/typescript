# 🌤️ Weather UI - TypeScript Weather Application

A modern, full-stack TypeScript weather application that provides real-time weather information for any location worldwide. Built with a focus on clean architecture, type safety, and responsive design.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [How to Use](#how-to-use)
- [API Integration](#api-integration)
- [Development](#development)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Weather UI is a TypeScript-based weather application that fetches real-time weather data from multiple APIs and displays it in a beautiful, responsive interface. The application uses a client-server architecture with modern web technologies to deliver a seamless user experience.

**Live URL:** `http://localhost:8098`

---

## ✨ Features

### Core Features

1. **Location Search**
   - Search for any city or location worldwide
   - Autocomplete-like suggestions via geocoding API
   - Display location coordinates and formatted name

2. **Real-Time Weather Data**
   - Current temperature and conditions
   - High/Low temperature forecasts
   - Weather condition descriptions
   - Hourly temperature data

3. **Weather Visualizations**
   - 9 different weather condition icons (SVG)
   - Clear, Cloudy, Overcast, Fog, Drizzle, Rain, Snow, Thunderstorm
   - Dynamic icon switching based on weather code

4. **Responsive Design**
   - Mobile-first approach
   - Dark mode support
   - Tailwind CSS styling
   - Smooth animations and transitions

5. **Error Handling**
   - Graceful error messages for invalid locations
   - User-friendly error display
   - Fallback to get started page on errors

6. **Type Safety**
   - Full TypeScript implementation
   - Zod schema validation for API responses
   - Type-safe API integrations

---

## 🛠️ Technology Stack

### Frontend
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **SVG Icons** - Scalable weather icons
- **HTML5** - Semantic markup

### Backend
- **Node.js** - JavaScript runtime
- **Fastify** - Modern, fast web framework
- **TypeScript** - Language for backend code
- **Nunjucks** - Template engine for rendering

### APIs
- **Open-Meteo Weather API** - Free, real-time weather data
  - Endpoint: `https://api.open-meteo.com/v1/forecast`
  - No authentication required
  
- **Geocode Maps API** - Location/coordinate lookup
  - Endpoint: `https://geocode.maps.co/search`
  - Requires API key (included in `.env`)

### Development Tools
- **ts-node** - Execute TypeScript directly
- **Nodemon** - Auto-reload on file changes
- **Jest** - Testing framework
- **Zod** - Runtime type validation
- **Axios** - HTTP client
- **Concurrently** - Run multiple processes
- **Livereload** - Hot reload in browser
- **ESLint** - Code linting

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                          │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   HTML + CSS + Assets                      │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │ │
│  │  │ Location     │  │  Weather     │  │  SVG Icons       │ │ │
│  │  │ Search Form  │  │  Display     │  │  (9 types)       │ │ │
│  │  │              │  │  - Temp      │  │  - Clear         │ │ │
│  │  │  [TEXT BOX]  │  │  - Condition │  │  - Cloudy        │ │ │
│  │  │  [BUTTON]    │  │  - Hi/Low    │  │  - Rain          │ │ │
│  │  │              │  │  - Date      │  │  - Snow          │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                            │                                     │
│                    HTTP GET /?location=X                         │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                 ┌───────────▼────────────┐
                 │   FASTIFY SERVER      │
                 │   (Node.js Runtime)   │
                 │   Port: 8098          │
                 └───────────┬────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        │            ┌───────▼──────┐             │
        │            │ Route Handler │             │
        │            │ GET /         │             │
        │            └───────┬──────┘             │
        │                    │                    │
        │         ┌──────────┴──────────┐         │
        │         │                     │         │
        │  ┌──────▼─────┐      ┌───────▼──────┐  │
        │  │  LOCATION  │      │  WEATHER API │  │
        │  │  SERVICE   │      │  SERVICE     │  │
        │  │            │      │              │  │
        │  │ 1. Validate│      │ 1. Fetch     │  │
        │  │    location│      │    forecast  │  │
        │  │ 2. Fetch   │      │ 2. Parse     │  │
        │  │    coords  │      │    response  │  │
        │  │ 3. Return  │      │ 3. Transform │  │
        │  │    details │      │    to domain │  │
        │  └──────┬─────┘      └───────┬──────┘  │
        │         │                    │         │
        │         └────────┬───────────┘         │
        │                  │                     │
        │          ┌───────▼──────┐              │
        │          │  RENDER VIEW │              │
        │          │              │              │
        │          │ 1. weather   │              │
        │          │    .njk      │              │
        │          │ 2. Inject    │              │
        │          │    data      │              │
        │          │ 3. Return    │              │
        │          │    HTML      │              │
        │          └───────┬──────┘              │
        │                  │                     │
        └──────────────────┼─────────────────────┘
                           │
                   ┌───────▼──────────┐
                   │  STATIC FILES    │
                   │  SERVING         │
                   │                  │
                   │ /dist/           │
                   │  ├─ styles.css   │
                   │  └─ static/      │
                   │      └─ img/     │
                   │          ├─ *.svg│
                   │          └─ ...  │
                   └──────────────────┘
```


### Data Flow Diagram

```
User Input (Location)
        │
        ▼
┌─────────────────────────────────────┐
│  Validate Location Input            │
│  - Non-empty string                 │
│  - Zod validation                   │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Fetch Coordinates                  │
│  - Call Geocode API                 │
│  - Parse lat/lon/display_name       │
│  - Error handling                   │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Fetch Weather Data                 │
│  - Call Open-Meteo API              │
│  - Get current + hourly data        │
│  - Parse with Zod                   │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Transform to Domain Objects        │
│  - Create CurrentWeather object     │
│  - Calculate high/low temps         │
│  - Map weather code to description  │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Map Weather Code to Icon           │
│  - weather code (0-99)              │
│  - Return SVG icon path             │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Render Template                    │
│  - Nunjucks template engine         │
│  - Inject all data                  │
│  - Apply Tailwind CSS               │
└─────────────┬───────────────────────┘
              │
              ▼
        HTML Response
        (Send to Browser)
```

### Component Architecture

```
Server (Fastify)
├── Route Handler (GET /)
│   ├── Input Validation (Zod)
│   ├── Location Service
│   │   └── fetchLocationData()
│   │       └── Geocode API Integration
│   ├── Weather Service
│   │   ├── fetchWeatherData()
│   │   │   └── Open-Meteo API Integration
│   │   └── CurrentWeather Domain Object
│   │       ├── temperature
│   │       ├── weatherCode
│   │       ├── is_day
│   │       ├── hourlyTemp
│   │       ├── condition()
│   │       ├── highTemp()
│   │       └── lowTemp()
│   ├── Weather Code Mapper
│   │   └── weatherCodeToImage()
│   └── Template Renderer (Nunjucks)
│       └── weather.njk
│           ├── Layout (main.njk)
│           ├── Head (head.njk)
│           └── Styling (index.css)
├── Static File Server
│   └── /dist/static/
│       ├── img/ (SVG icons)
│       └── styles.css
└── Error Handler
    └── Fallback: get_started.njk
```

---

## 📁 Project Structure

```
weather_ui/
├── src/
│   └── backend/
│       ├── server.ts                 # Main Fastify server & route handlers
│       ├── weatherapi.ts            # Weather API client & data models
│       ├── location.ts              # Location/geocoding API client
│       ├── weatherapi.test.ts       # Weather service tests
│       ├── location.test.ts         # Location service tests
│       └── templates/
│           ├── main.njk             # Base layout template
│           ├── weather.njk          # Weather display template
│           ├── get_started.njk      # Initial/error page
│           ├── head.njk             # Head partial
│           ├── devserver.njk        # Dev server template
│           └── index.css            # Base CSS (Tailwind)
├── assets/
│   └── static/
│       └── weather-cions/reshot/    # Weather SVG icons (9 types)
│           ├── clear.svg
│           ├── cloudy.svg
│           ├── drizzle.svg
│           ├── fog.svg
│           ├── info.svg
│           ├── overcast.svg
│           ├── rain.svg
│           ├── snow.svg
│           └── thunderstorm.svg
├── dist/                            # Built output (generated)
│   ├── styles.css                   # Compiled Tailwind CSS
│   └── static/
│       └── img/                      # Copied SVG icons
├── build.js                         # Asset copying script
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript config
├── tailwind.config.js              # Tailwind CSS config
├── jest.config.js                  # Jest testing config
├── .env                            # Environment variables
└── README.md                       # This file
```


---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** >= 18.9.1
- **pnpm** (or npm/yarn)
- **API Key** for Geocode Maps API (included in `.env`)

### Step 1: Clone & Navigate

```bash
# Navigate to project directory
cd /Users/raushankumar/ZTM-COURSE/typescript/app/weather_ui
```

### Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### Step 3: Environment Variables

The `.env` file is already configured with the required API key:

```env
GEOCODE_API_KEY=6b01a41f88f22462111808zxbd1d0fe
NODE_ENV=development
```

**⚠️ Note:** In production, store this key securely (use secret management services)

### Step 4: Start Development Server

```bash
# Run development environment with all watchers
pnpm dev

# Or individual commands:

# Terminal 1: Build assets
pnpm run build

# Terminal 2: Compile Tailwind CSS (watch mode)
pnpm run dev:tailwind

# Terminal 3: Start backend server
pnpm run dev:backend

# Terminal 4: Frontend build (if needed)
pnpm run dev:frontend

# Terminal 5: Live reload
pnpm run dev:reload
```

### Step 5: Access the Application

Open your browser and navigate to:

```
http://localhost:8098
```

---

## 📱 How to Use

### Basic Usage

1. **Open Application**
   - Navigate to `http://localhost:8098`
   - See the initial "Get Started" page

2. **Search for a Location**
   - Enter any city or location name (e.g., "London", "New York", "Tokyo")
   - Click "Update Location" button
   - Wait for weather data to load

3. **View Weather Information**
   - **Weather Icon**: Visual representation of current conditions
   - **Location Name**: City and country
   - **Current Date**: Today's date
   - **Temperature**: 
     - Orange/Yellow text: High temperature
     - Blue text: Low temperature
   - **Weather Condition**: Text description
   - **Search Again**: Use the form to search for a different location

### Example Locations to Try

- London
- New York
- Tokyo
- Paris
- Sydney
- Mumbai
- Dubai
- Berlin
- São Paulo
- Singapore

### Dark Mode

- Automatically adapts to system preferences
- Tailwind's `dark:` classes handle styling
- Toggle in browser dev tools or OS settings


---

## 🔌 API Integration

### 1. Geocoding API (Coordinates Lookup)

**Purpose:** Convert location names to coordinates

**API:** Geocode Maps Co
- **Endpoint:** `https://geocode.maps.co/search`
- **Method:** GET
- **Authentication:** Bearer token

**Request:**
```
GET https://geocode.maps.co/search?q=London
Headers: Authorization: Bearer 6b01a41f88f22462111808zxbd1d0fe
```

**Response:**
```json
[
  {
    "lat": "51.5073219",
    "lon": "-0.1276474",
    "display_name": "London, England, United Kingdom"
  }
]
```

**Usage in Code:**
```typescript
// location.ts
const locationInfo = await fetchLocationData(
  axios,
  "https://geocode.maps.co/search",
  "London"
);
// Returns: { lat: "51.5073219", lon: "-0.1276474", display_name: "..." }
```

### 2. Weather API (Real-Time Data)

**Purpose:** Fetch current and forecast weather data

**API:** Open-Meteo
- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Method:** GET
- **Authentication:** None required

**Request:**
```
GET https://api.open-meteo.com/v1/forecast?
  latitude=51.5073219&
  longitude=-0.1276474&
  hourly=temperature_2m&
  temperature_unit=celsius&
  current_weather=true&
  forecast_days=1
```

**Response:**
```json
{
  "current_weather": {
    "time": "2024-11-22T16:00",
    "temperature": 12.5,
    "windspeed": 15.3,
    "winddirection": 210,
    "is_day": 1,
    "weathercode": 2
  },
  "hourly_units": {
    "temperature_2m": "°C"
  },
  "hourly": {
    "temperature_2m": [5.2, 6.1, 7.3, 8.5, 9.2, 10.1, 11.5, 12.5]
  }
}
```

**Usage in Code:**
```typescript
// weatherapi.ts
const weather = await fetchWeatherData(
  axios,
  "https://api.open-meteo.com/v1/forecast",
  51.5073219,
  -0.1276474
);
// Returns: CurrentWeather instance with all weather data
```

### Weather Codes Reference

| Code | Description | Icon |
|------|-------------|------|
| 0-1 | Clear/Mainly clear | ☀️ |
| 2 | Partly cloudy | ⛅ |
| 3 | Overcast | ☁️ |
| 45, 48 | Fog | 🌫️ |
| 51-57 | Drizzle | 🌧️ |
| 61-67 | Rain | 🌧️ |
| 71-77 | Snow | ❄️ |
| 80-82 | Rain showers | 🌧️ |
| 85-86 | Snow showers | ❄️ |
| 95-99 | Thunderstorm | ⛈️ |


---

## 🛠️ Development

### Code Organization

**Backend Structure:**

```typescript
// server.ts - Main server file
export const weatherCodeToImage = (code: number): string => {
  // Maps weather codes to SVG icon paths
}

server.get("/", async (request, reply) => {
  // Main route handler
  // 1. Validate input
  // 2. Fetch location coordinates
  // 3. Fetch weather data
  // 4. Render template with data
})

// weatherapi.ts - Weather domain logic
export class CurrentWeather {
  temperature: Temperature
  weatherCode: number
  is_day: boolean
  time: string
  hourlyTemp: number[]
  
  condition(): string
  lowTemp(): number
  highTemp(): number
}

// location.ts - Location domain logic
export async function fetchLocationData(
  axios: AxiosStatic,
  apiUrl: string,
  locationName: string
): Promise<LocationInfo>
```

**Type Safety with Zod:**

```typescript
// Schema validation
export const currentWeatherApiResponseSchema = z.object({
  current_weather: z.object({
    time: z.string(),
    temperature: z.number(),
    // ...
  }),
  // ...
})

// Parse and validate API responses
const parsedResponse = currentWeatherApiResponseSchema.parse(response.data)
```

### File Watchers

The dev setup uses `nodemon` to watch for changes:

```json
{
  "watch": ["./src"],
  "ext": "ts,njk,css",
  "exec": "ts-node src/backend/server.ts"
}
```

This automatically restarts the server when you modify:
- TypeScript files (`.ts`)
- Templates (`.njk`)
- Styles (`.css`)

### Template System (Nunjucks)

**main.njk** - Base layout:
```nunjucks
<!DOCTYPE html>
<html>
<head>
  {% include "head.njk" %}
</head>
<body>
  {% block content %}{% endblock %}
</body>
</html>
```

**weather.njk** - Weather display:
```nunjucks
{% extends "main.njk" %}

{% block content %}
  <div class="weather-container">
    <img src="{{ weather.conditionImg }}" />
    <p>{{ weather.condition }}</p>
    <!-- ... -->
  </div>
{% endblock %}
```


---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

### Test Files

- **location.test.ts** - Geocoding API client tests
- **weatherapi.test.ts** - Weather API client tests

### Example Test

```typescript
// location.test.ts
describe('fetchLocationData', () => {
  it('should fetch location coordinates', async () => {
    const mockAxios = {
      request: jest.fn().mockResolvedValue({
        status: 200,
        data: [{
          lat: "51.5073219",
          lon: "-0.1276474",
          display_name: "London"
        }]
      })
    }
    
    const result = await fetchLocationData(mockAxios, apiUrl, "London")
    expect(result.lat).toBe("51.5073219")
  })
})
```

---

## 🔍 Troubleshooting

### Issue: Images not loading

**Solution:** Run the build script to copy SVG icons
```bash
pnpm run build
```

**Why:** SVG files must be copied from `/assets` to `/dist/static/img/` for the server to serve them.

### Issue: "GEOCODE_API_KEY is not set"

**Solution:** Ensure `.env` file exists with the API key
```bash
echo "GEOCODE_API_KEY=6b01a41f88f22462111808zxbd1d0fe" > .env
```

### Issue: Port 8098 already in use

**Solution:** Change the port in `server.ts`
```typescript
await server.listen({ port: 8099 }) // Use different port
```

### Issue: "Cannot find module" errors

**Solution:** Install dependencies
```bash
pnpm install
```

### Issue: Templates not updating

**Solution:** Restart the server
```bash
# Stop with Ctrl+C
# Then restart
pnpm dev
```

### Issue: CSS styles not applying

**Solution:** Rebuild Tailwind CSS
```bash
pnpm run dev:tailwind
```

---

## 📊 Performance Considerations

1. **Caching:** Currently no caching implemented
   - Consider adding Redis for location/weather data
   
2. **Error Handling:** Graceful fallbacks
   - Invalid locations → "Get Started" page
   - API failures → Error messages
   
3. **SVG Icons:** Pre-optimized
   - 9 different weather conditions
   - Lightweight and scalable
   - Support dark mode with CSS invert

4. **TypeScript:** Full type safety
   - Compile-time error catching
   - Runtime validation with Zod

---

## 🔐 Security

### Environment Variables
- API keys stored in `.env` (not in git)
- Bearer token used for Geocode API
- Never commit secrets

### Input Validation
- All user input validated with Zod
- Location input sanitized before API calls
- Error messages don't expose sensitive data

### CORS & Headers
- Server configured with appropriate headers
- Content-Type specified for all responses

---

## 📚 Useful Resources

- [Fastify Documentation](https://www.fastify.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Nunjucks Template Engine](https://mozilla.github.io/nunjucks/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod Validation](https://zod.dev/)
- [Open-Meteo API](https://open-meteo.com/)
- [Geocode Maps API](https://geocode.maps.co/)

---

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch
2. Make your changes with TypeScript
3. Add tests for new functionality
4. Run linter: `pnpm lint`
5. Submit a pull request

---

## 📝 License

(MIT OR Apache-2.0)

---

## ✅ Checklist for Local Setup

- [ ] Node.js >= 18.9.1 installed
- [ ] Repository cloned
- [ ] Dependencies installed (`pnpm install`)
- [ ] `.env` file exists with API key
- [ ] Run `pnpm build` to copy assets
- [ ] Start server with `pnpm dev`
- [ ] Open `http://localhost:8098`
- [ ] Try searching for a location
- [ ] Weather data and images display correctly

---

**Happy weather tracking! 🌞🌧️❄️**
