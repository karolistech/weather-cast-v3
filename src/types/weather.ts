export type WeatherLocation = {
  name: string;
  timezone: string;
};

export type WeatherCurrent = {
  weatherCode: number;
  isDay: boolean;
  temp: number;
  tempUnit: string;
  apparentTemp: number;
  maxTemp: number;
  minTemp: number;
  sunrise: string;
  sunset: string;
  rainChance: number;
  humidity: number;
  cloudCover: number;
  uvIndex: number;
  windSpeed: number;
  surfacePressure: number;
};

export type WeatherHourly = {
  dateTime: string;
  temp: number;
  rainChance: number;
};

export type WeatherDaily = {
  date: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
  rainChance: number;
};

export type Weather = {
  location: WeatherLocation;
  current: WeatherCurrent;
  hourly: WeatherHourly[];
  daily: WeatherDaily[];
};
