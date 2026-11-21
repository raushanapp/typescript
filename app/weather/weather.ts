import type { LocationInfo } from "./location";
import { fetchLocationData } from "./location";
const GEOCODE_API_URL = "https://geocode.maps.co/search";

async function main(): Promise<number> {
  //  pnpm run weather  LOCATION
  if (process.argv.length !== 3) {
    console.error("usage :  weather LOCATION");
    return 1;
  }
  //  Get location from command line arguments

  const location = process.argv[2];
  //  convert location to lat /lon
  let locationInfo: LocationInfo;
  try {
    locationInfo = await fetchLocationData(GEOCODE_API_URL, location);
  } catch (error) {
    console.error(error);
    return 1;
  }
  // fetch weather data
  // display weather data

  console.log(locationInfo);
  return 0;
}

main()
  .then((exitCode) => {
    process.exitCode = exitCode;
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
