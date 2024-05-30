import { GeoLocationData } from "@/lib/utils/types";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchData = async (
  ipAddress: string
): Promise<GeoLocationData> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  try {
    const response = await axios.get<GeoLocationData>(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
