# 🚀 Quick Start Guide - Weather UI

Get the Weather UI application up and running in 5 minutes!

---

## 📋 Prerequisites

Before starting, ensure you have:

✅ **Node.js** version 18.9.1 or higher
   ```bash
   node --version  # Check your version
   ```

✅ **pnpm** (or npm/yarn)
   ```bash
   npm install -g pnpm  # Install pnpm globally
   pnpm --version        # Verify installation
   ```

✅ **Terminal/Command Prompt** access

---

## 🎯 5-Minute Setup

### Step 1: Navigate to Project (30 seconds)

```bash
cd /Users/raushankumar/ZTM-COURSE/typescript/app/weather_ui
```

### Step 2: Install Dependencies (1-2 minutes)

```bash
pnpm install
```

**What happens:** Downloads and installs all required packages from `package.json`

### Step 3: Build Assets (10 seconds)

```bash
pnpm run build
```

**What happens:** Copies SVG weather icons from `/assets` to `/dist/static/img/`

### Step 4: Start Development Server (30 seconds)

```bash
pnpm dev
```

**What happens:**
- Compiles Tailwind CSS
- Starts Fastify server on port 8098
- Enables file watchers for auto-reload
- Sets up live reload

**You should see:**
```
Server is running on http://localhost:8098
```

### Step 5: Open in Browser (10 seconds)

Open your browser and visit:

```
http://localhost:8098
```

---

## ✨ First Weather Search

1. **See the "Get Started" page** ✓
2. **Enter a location** - Try: `London`, `New York`, or `Tokyo`
3. **Click "Update Location"** button
4. **Wait 2-3 seconds** for data to load
5. **View the weather!** 🌤️

---

## 🎨 What You'll See

### Success Result:
```
┌─────────────────────────────────────┐
│                                     │
│        ☁️  Cloudy Weather Icon      │
│                                     │
│  London, England, United Kingdom    │
│  Friday, November 22, 2024          │
│                                     │
│    15°C (High)  /  5°C (Low)        │
│                                     │
│       Partly Cloudy                 │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Search for another location│   │
│  │  [____________]             │   │
│  │  [Update Location Button]   │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## 🛑 Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| **"Cannot find module"** | Run: `pnpm install` |
| **Port 8098 in use** | Use different port in `src/backend/server.ts` |
| **Images not loading** | Run: `pnpm run build` |
| **API key error** | Check `.env` file has `GEOCODE_API_KEY` |
| **Styles not applying** | Run: `pnpm run dev:tailwind` |
| **Templates not updating** | Restart server with `Ctrl+C` then `pnpm dev` |

---

## 📚 Next Steps

After successfully running the app:

1. **Read Full Documentation**
   - Main docs: [`README.md`](./README.md)
   - Architecture: [`ARCHITECTURE.md`](./ARCHITECTURE.md)

2. **Explore the Code**
   - Main server: [`src/backend/server.ts`](./src/backend/server.ts)
   - Weather API: [`src/backend/weatherapi.ts`](./src/backend/weatherapi.ts)
   - Location API: [`src/backend/location.ts`](./src/backend/location.ts)
   - Templates: [`src/backend/templates/`](./src/backend/templates/)

3. **Try Different Features**
   - Search multiple locations
   - Try dark mode (system preference)
   - Check responsive design (resize browser)
   - Test error handling (invalid locations)

4. **Run Tests**
   ```bash
   pnpm test
   ```

5. **Check Code Quality**
   ```bash
   pnpm lint
   ```

---

## 🎓 Project Overview

**What is Weather UI?**
- Full-stack weather application
- Shows real-time weather for any location
- Built with TypeScript, Node.js, and Fastify
- Beautiful, responsive UI with Tailwind CSS

**Tech Stack:**
- **Backend:** Node.js + Fastify + TypeScript
- **Frontend:** HTML + Tailwind CSS + SVG
- **APIs:** Open-Meteo (weather) + Geocode (location)
- **Tools:** Jest (testing), Nunjucks (templates)

**Key Files:**
- `server.ts` - Main application logic
- `weatherapi.ts` - Weather data fetching
- `location.ts` - Location coordinate fetching
- `templates/weather.njk` - UI template

---

## 🔧 Available Commands

```bash
# Start development with all watchers
pnpm dev

# Copy SVG assets to dist
pnpm run build

# Watch and compile Tailwind CSS
pnpm run dev:tailwind

# Run backend server with auto-reload
pnpm run dev:backend

# Run tests
pnpm test

# Run linter
pnpm lint

# Run custom checks
pnpm check
```

---

## 📞 Need Help?

**Common Issues:**

❌ **"Server failed to start"**
- Check if port 8098 is available
- Try a different port in `server.ts`

❌ **"Location not found"**
- Try a more specific location name
- Use format: "City, Country"
- Examples: "London, UK", "New York, USA"

❌ **"API key error"**
- Verify `.env` file exists
- Check `GEOCODE_API_KEY` is set
- Restart server after changing `.env`

❌ **"Images/CSS not loading"**
- Run: `pnpm run build`
- Clear browser cache (Ctrl+Shift+Delete)
- Restart server

---

## 🎉 You're All Set!

Your Weather UI application is now running! 🌞

Go search for some weather! Try these fun locations:
- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 London
- 🗽 New York
- 🗼 Tokyo
- 🗿 Paris
- 🦘 Sydney

**Happy weather tracking!** ⛅🌧️❄️

---

## 📖 Learn More

- [Full README](./README.md) - Complete documentation
- [Architecture Guide](./ARCHITECTURE.md) - System design & diagrams
- [Fastify Docs](https://www.fastify.io/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Open-Meteo API](https://open-meteo.com/)

---

**Last Updated:** November 22, 2024
