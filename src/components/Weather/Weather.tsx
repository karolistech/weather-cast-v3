import type { Weather } from "@/types/weather";

import WeatherLocation from "./WeatherLocation/WeatherLocation";
import WeatherCurrent from "./WeatherCurrent/WeatherCurrent";
import WeatherHourly from "./WeatherHourly/WeatherHourly";
import WeatherDaily from "./WeatherDaily/WeatherDaily";

type WeatherProps = {
  weather: Weather;
  updateWeather: () => void;
};

export default function Weather({ weather, updateWeather }: WeatherProps) {
  return (
    <div className="weather">
      <WeatherLocation location={weather.location} updateWeather={updateWeather} />
      <WeatherCurrent current={weather.current} />
      <WeatherHourly hourly={weather.hourly} />
      <WeatherDaily daily={weather.daily} />
    </div>
  );
}
