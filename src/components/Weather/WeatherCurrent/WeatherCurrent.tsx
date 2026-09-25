import type { WeatherCurrent } from "@/types/weather";

import { getWeatherCondition, getWeatherIcon } from "@/components/Weather/weather-conditions";

import { formatTime } from "@/utils/formatters";

import "./WeatherCurrent.css";
import uiIcons from "@/assets/icons/ui-icons/ui-icons.svg";

type WeatherCurrentProps = {
  current: WeatherCurrent;
};

export default function WeatherCurrent({ current }: WeatherCurrentProps) {
  const condition = getWeatherCondition(current.weatherCode, current.isDay);
  const icon = getWeatherIcon(condition.icon);

  return (
    <div className="weather-current">
      <div className="weather-current__summary">
        <img src={icon} alt={condition.description} className="weather-current__icon" />

        <div className="weather-current__summary-data">
          <span className="weather-current__temp">
            {current.temp} {current.tempUnit}
          </span>

          <p className="weather-current__condition">
            {condition.description}
          </p>
        </div>
      </div>

      <div className="weather-current__primary">
        <Metric icon="apparent-temp" label="Feels" value={`${current.apparentTemp}°`} />
        <Metric icon="upwards-arrow" label="Max" value={`${current.maxTemp}°`} />
        <Metric icon="downwards-arrow" label="Min" value={`${current.minTemp}°`} />
      </div>

      <div className="weather-current__secondary">
        <Metric icon="sunrise" label="Sunrise" value={formatTime(current.sunrise)} />
        <Metric icon="sunset" label="Sunset" value={formatTime(current.sunset)} />
        <Metric icon="rain-chance" label="Rain Chance" value={`${current.rainChance}%`} />
        <Metric icon="humidity" label="Humidity" value={`${current.humidity}%`} />
        <Metric icon="cloud-cover" label="Cloud Cover" value={`${current.cloudCover}%`} />
        <Metric icon="uv-index" label="UV Index" value={`${current.uvIndex}`} />
        <Metric icon="wind-speed" label="Wind Speed" value={`${current.windSpeed} m/s`} />
        <Metric icon="surface-pressure" label="Surface Pressure" value={`${current.surfacePressure} hPa`} />
      </div>
    </div>
  );
}

type MetricProps = {
  icon: string;
  label: string;
  value: string;
};

function Metric({ icon, label, value }: MetricProps) {
  return (
    <div className="weather-current__metric">
      <svg className="weather-current__metric-icon">
        <use href={`${uiIcons}#${icon}`} />
      </svg>

      <div className="weather-current__metric-data">
        <span className="weather-current__metric-label">
          {label}
        </span>

        <span className="weather-current__metric-value">
          {value}
        </span>
      </div>
    </div>
  );
}
