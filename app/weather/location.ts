import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export interface LocationInfo {
  lat: number;
  lon: number;
  display_name: string;
}

export async function fetchLocationData(
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
  const response = await axios.request<LocationInfo[]>(options);
  if (response.status === 200) {
    if (response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error(
        `Unable to find location information for ${locationName} `,
      );
    }
  } else {
    throw new Error("Failed to fetch location data");
  }
}
