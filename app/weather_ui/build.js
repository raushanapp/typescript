#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Copy weather icons to dist
const srcDir = path.join(__dirname, "assets/static/weather-cions/reshot");
const destDir = path.join(__dirname, "dist/static/img");

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy all SVG files
fs.readdirSync(srcDir).forEach((file) => {
  if (file.endsWith(".svg")) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file}`);
  }
});

console.log("✓ Assets copied successfully");
