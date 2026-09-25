import { WeatherLocation } from "@/types/weather";

import "./WeatherLocation.css";
import uiIcons from "@/assets/icons/ui-icons/ui-icons.svg";

type WeatherLocationProps = {
  location: WeatherLocation;
  updateWeather: () => void;
};

export default function WeatherLocation({ location, updateWeather }: WeatherLocationProps) {
  const now = new Date();

  const date = now.toLocaleDateString(undefined, {
    weekday: "short", month: "long", day: "numeric", timeZone: location.timezone
  });

  const time = now.toLocaleTimeString(undefined, {
    hour: "numeric", minute: "2-digit", timeZone: location.timezone
  });

  return (
    <div className="weather-location">
      <div className="weather-location__location">
        <svg className="weather-location__location-icon">
          <use href={`${uiIcons}#location`} />
        </svg>

        <span className="weather-location__location-name">
          {location.name}
        </span>
      </div>

      <div className="weather-location__datetime">
        <span className="weather-location__datetime-value">
          {date} {time}
        </span>

        <button className="weather-location__update-button" onClick={updateWeather}>
          <svg className="weather-location__update-icon">
            <use href={`${uiIcons}#update`} />
          </svg>
        </button>
      </div>
    </div>
  );
}
