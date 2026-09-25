import type { WeatherDaily } from "@/types/weather";

import { getWeatherCondition, getWeatherIcon } from "@/components/Weather/weather-conditions";

import { formatDayName } from "@/utils/formatters";

import "./WeatherDaily.css";
import uiIcons from "@/assets/icons/ui-icons/ui-icons.svg";

type WeatherDailyProps = {
  daily: WeatherDaily[];
};

export default function WeatherDaily({ daily }: WeatherDailyProps) {
  return (
    <div className="weather-daily">
      <h2 className="weather-daily__title">7-Day Forecast</h2>

      <div className="weather-daily__days">
        {daily.map((day, i) => (
          <Day key={i} day={day} isToday={i === 0} />
        ))}
      </div>
    </div>
  );
}

type DayProps = {
  day: WeatherDaily;
  isToday: boolean;
};

function Day({ day, isToday }: DayProps) {
  const condition = getWeatherCondition(day.weatherCode, true);
  const icon = getWeatherIcon(condition.icon);

  return (
    <div className="weather-daily__day">
      <span className="weather-daily__day-name">
        {isToday ? "Today" : formatDayName(day.date)}
      </span>

      <img src={icon} alt={condition.description} className="weather-daily__icon" />

      <div className="weather-daily__metric">
        <span className="weather-daily__max-temp">
          {Math.round(day.maxTemp)}°
        </span>

        <span className="weather-daily__min-temp">
          {Math.round(day.minTemp)}°
        </span>
      </div>

      <div className="weather-daily__metric">
        <svg className="weather-daily__metric-icon">
          <use href={`${uiIcons}#rain-chance`} />
        </svg>

        <span className="weather-daily__metric-value">
          {day.rainChance}%
        </span>
      </div>
    </div>
  );
}
