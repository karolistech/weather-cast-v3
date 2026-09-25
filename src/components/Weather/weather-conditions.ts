const icons = import.meta.glob<string>("@/assets/icons/weather-icons/*.svg", {
  import: "default",
  eager: true
});

const conditions = [
  { code: 0, description: "Clear", icon: "clear" },
  { code: 1, description: "Mainly clear", icon: "clear" },
  { code: 2, description: "Partly cloudy", icon: "partly-cloudy" },
  { code: 3, description: "Overcast", icon: "overcast" },

  { code: 45, description: "Foggy", icon: "fog" },
  { code: 48, description: "Freezing fog", icon: "fog-freezing" },

  { code: 51, description: "Light drizzle", icon: "rain" },
  { code: 53, description: "Moderate drizzle", icon: "rain" },
  { code: 55, description: "Heavy drizzle", icon: "rain-heavy" },

  { code: 56, description: "Light freezing drizzle", icon: "rain" },
  { code: 57, description: "Heavy freezing drizzle", icon: "rain-heavy" },

  { code: 61, description: "Light rain", icon: "rain" },
  { code: 63, description: "Moderate rain", icon: "rain" },
  { code: 65, description: "Heavy rain", icon: "rain-heavy" },

  { code: 66, description: "Light freezing rain", icon: "rain" },
  { code: 67, description: "Heavy freezing rain", icon: "rain-heavy" },

  { code: 71, description: "Light snow", icon: "snow" },
  { code: 73, description: "Moderate snow", icon: "snow" },
  { code: 75, description: "Heavy snow", icon: "snow" },
  { code: 77, description: "Snow grains", icon: "snow-grains" },

  { code: 80, description: "Light rain showers", icon: "rain" },
  { code: 81, description: "Moderate rain showers", icon: "rain" },
  { code: 82, description: "Heavy rain showers", icon: "rain-heavy" },

  { code: 85, description: "Light snow showers", icon: "snow-showers" },
  { code: 86, description: "Heavy snow showers", icon: "snow-showers-heavy" },

  { code: 95, description: "Thunderstorm", icon: "thunderstorm" },
  { code: 96, description: "Thunderstorm with hail", icon: "thunderstorm-hail" },
  { code: 99, description: "Thunderstorm with heavy hail", icon: "thunderstorm-hail" }
] as const;

export function getWeatherCondition(code: number, isDay: boolean): { description: string, icon: string } {
  const condition = conditions.find(condition => condition.code === code);

  if (condition === undefined) {
    throw new Error(`Weather code "${code}" was not found`);
  }

  const prefix = isDay ? "day-" : "night-";

  return {
    description: condition.description,
    icon: `${prefix}${condition.icon}`
  };
}

export function getWeatherIcon(name: string): string {
  const key = Object.keys(icons).find(key => key.endsWith(`/weather-icons/${name}.svg`));

  if (key === undefined) {
    throw new Error(`Weather icon "${name}" was not found`);
  }

  return icons[key];
}
