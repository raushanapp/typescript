// import axios from "axios";
import { z } from "zod";
import type { AxiosStatic } from "axios";
import dotenv from "dotenv";
dotenv.config();

const LocationInfoSchema = z.object({
  lat: z.string(),
  lon: z.string(),
  display_name: z.string(),
});

export type LocationInfo = z.infer<typeof LocationInfoSchema>;

export async function fetchLocationData(
  axios: AxiosStatic,
  apiUrl: string,
  locationName: string,
): Promise<LocationInfo> {
  //  const GEOCODE_API_URL = "https://geocode.maps.co/search?q={locationName}";
  const apiKey = process.env.GEOCODE_API_KEY;
  if (apiKey === undefined || apiKey === "") {
    throw new Error("GEOCODE_API_KEY is not set");
  }

  const options = {
    method: "GET",
    url: apiUrl,
    params: {
      q: locationName,
    },
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const response = await axios.request(options);

  if (response.status !== 200) {
    throw new Error("Failed to fetch location data");
  }

  const location = response.data?.[0];

  if (!location) {
    throw new Error(`No location found for "${locationName}"`);
  }

  try {
    return LocationInfoSchema.parse(location);
  } catch (err) {
    console.error("Location data validation failed:", err);
    throw new Error(`Failed to parse location data: ${err}`);
  }
}
