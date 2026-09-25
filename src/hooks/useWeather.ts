import { useEffect, useState } from "react";

import type { Location } from "@/types/locations";
import type { TempUnit } from "@/types/tempUnit";
import type { Weather } from "@/types/weather";

import { fetchWeather } from "@/api/weather";

export function useWeather(location: Location, tempUnit: TempUnit) {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    updateWeather();
  }, [location, tempUnit]);

  async function updateWeather() {
    try {
      const weather = await fetchWeather(location, tempUnit);

      setWeather(weather);
    } catch (error) {
      console.error(error);
    }
  }

  return { weather, updateWeather };
}
