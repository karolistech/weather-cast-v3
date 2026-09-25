import type { WeatherHourly } from "@/types/weather";

import { formatTime } from "@/utils/formatters";

import "./WeatherHourly.css";
import uiIcons from "@/assets/icons/ui-icons/ui-icons.svg";

type WeatherHourlyProps = {
  hourly: WeatherHourly[];
};

export default function WeatherHourly({ hourly }: WeatherHourlyProps) {
  return (
    <div className="weather-hourly">
      <h2 className="weather-hourly__title">Hourly Forecast</h2>

      <div className="weather-hourly__hours">
        {hourly.map((hour, i) => (
          <Hour key={i} hour={hour} />
        ))}
      </div>
    </div>
  );
}

type HourProps = {
  hour: WeatherHourly;
};

function Hour({ hour }: HourProps) {
  return (
    <div className="weather-hourly__hour">
      <span className="weather-hourly__time">
        {formatTime(hour.dateTime)}
      </span>

      <div className="weather-hourly__metric">
        <svg className="weather-hourly__metric-icon">
          <use href={`${uiIcons}#temperature`} />
        </svg>

        <span className="weather-hourly__metric-value">
          {hour.temp}°
        </span>
      </div>

      <div className="weather-hourly__metric">
        <svg className="weather-hourly__metric-icon">
          <use href={`${uiIcons}#rain-chance`} />
        </svg>

        <span className="weather-hourly__metric-value">
          {hour.rainChance}%
        </span>
      </div>
    </div>
  );
}
