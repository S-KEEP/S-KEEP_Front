import {
  IcClear,
  IcCloudy,
  IcPartlyCloudy,
  IcRain,
  IcRainAndSnow,
  IcShower,
  IcSnow,
} from '../../assets/icon';

export interface WeatherDTO {
  date: string;
  eWeatherCondition: TWeatherCondition;
  temperature: string;
}

export enum WeatherCondition {
  CLEAR = 'CLEAR', // 맑음
  PARTLY_CLOUDY = 'PARTLY_CLOUDY', // 구름많음
  CLOUDY = 'CLOUDY', // 흐림
  RAIN = 'RAIN', // 비
  RAIN_AND_SNOW = 'RAIN_AND_SNOW', // 비/눈
  SHOWER = 'SHOWER', // 소나기
  SNOW = 'SNOW', // 눈
}

export type TWeatherCondition = WeatherCondition;

export const WEATHER_ICON_MAPS: Record<
  TWeatherCondition,
  React.ComponentType<{}>
> = {
  [WeatherCondition.CLEAR]: IcClear,
  [WeatherCondition.CLOUDY]: IcCloudy,
  [WeatherCondition.PARTLY_CLOUDY]: IcPartlyCloudy,
  [WeatherCondition.RAIN]: IcRain,
  [WeatherCondition.RAIN_AND_SNOW]: IcRainAndSnow,
  [WeatherCondition.SHOWER]: IcShower,
  [WeatherCondition.SNOW]: IcSnow,
};
