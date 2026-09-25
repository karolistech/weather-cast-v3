import type { Location } from "@/types/locations";
import type { TempUnit } from "@/types/tempUnit";
import type { Weather } from "@/types/weather";

type WeatherResponse = {
  timezone: string;

  current_units: {
    temperature_2m: string;
  };

  current: {
    time: string;
    weather_code: number;
    is_day: number;
    temperature_2m: number;
    apparent_temperature: number;
    precipitation_probability: number;
    relative_humidity_2m: number;
    cloud_cover: number;
    uv_index: number;
    wind_speed_10m: number;
    surface_pressure: number;
  };

  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
  };

  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

const baseUrl = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(location: Location, tempUnit: TempUnit): Promise<Weather> {
  const params = new URLSearchParams();

  params.set("latitude", String(location.lat));
  params.set("longitude", String(location.lon));

  params.set("timezone", "auto");
  params.set("temperature_unit", tempUnit);
  params.set("wind_speed_unit", "ms");

  params.set("current", [
    "weather_code", "is_day", "temperature_2m", "apparent_temperature",
    "precipitation_probability", "relative_humidity_2m", "cloud_cover", "uv_index",
    "wind_speed_10m", "surface_pressure"
  ].join(","));

  params.set("hourly", ["temperature_2m", "precipitation_probability"].join(","));

  params.set("daily", [
    "sunrise", "sunset", "weather_code", "temperature_2m_max", "temperature_2m_min",
    "precipitation_probability_max"
  ].join(","));

  const response = await fetch(`${baseUrl}?${params}`);

  if (!response.ok) {
    throw new Error(`Weather request failed with the status code ${response.status}`);
  }

  const data: WeatherResponse = await response.json();

  const { timezone, current_units, current, hourly, daily } = data;

  const localTime = new Date(current.time);
  const startIndex = hourly.time.findIndex(time => new Date(time) > localTime);

  return {
    location: {
      name: location.name,
      timezone: timezone
    },

    current: {
      weatherCode: current.weather_code,
      isDay: current.is_day === 1,
      temp: current.temperature_2m,
      tempUnit: current_units.temperature_2m,
      apparentTemp: current.apparent_temperature,
      maxTemp: daily.temperature_2m_max[0],
      minTemp: daily.temperature_2m_min[0],
      sunrise: daily.sunrise[0],
      sunset: daily.sunset[0],
      rainChance: current.precipitation_probability,
      humidity: current.relative_humidity_2m,
      cloudCover: current.cloud_cover,
      uvIndex: current.uv_index,
      windSpeed: current.wind_speed_10m,
      surfacePressure: current.surface_pressure
    },

    hourly: Array.from({ length: 7 }, (_, i) => ({
      dateTime: hourly.time[startIndex + i * 2],
      temp: hourly.temperature_2m[startIndex + i * 2],
      rainChance: hourly.precipitation_probability[startIndex + i * 2]
    })),

    daily: Array.from({ length: 7 }, (_, i) => ({
      date: daily.time[i],
      weatherCode: daily.weather_code[i],
      maxTemp: daily.temperature_2m_max[i],
      minTemp: daily.temperature_2m_min[i],
      rainChance: daily.precipitation_probability_max[i]
    }))
  };
}
