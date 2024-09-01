import React, {useMemo} from 'react';
import {View} from 'react-native';
import {IcAirplane, IcWarn} from '../../../assets/icon';
import {WeatherDTO} from '../../../types/dtos/weather';
import {useGetWeather} from '../../../hooks/queries/weather/useGetWeather';
import WeatherSection from './WeatherSection/WeatherSection';

interface WeatherProps {
  location: {x: string; y: string};
}

export default function Weather({location}: WeatherProps) {
  const {data, isLoading, isError, error} = useGetWeather(location);

  const {avoidDays, idealDays} = useMemo(() => {
    if (data) return classifyWeatherDays(data.weatherDtoList);
    return {avoidDays: [], idealDays: []};
  }, [data]);

  return (
    <View>
      <WeatherSection
        title="떠나기 좋은 날"
        icon={<IcAirplane />}
        days={idealDays}
        isLoading={isLoading}
        emptyMessage="앞으로 10일간은 여행하기에 적절한 날이 없어요!"
      />
      <WeatherSection
        title="피해야 하는 날"
        icon={<IcWarn />}
        days={avoidDays}
        isLoading={isLoading}
        emptyMessage="피해야 하는 날은 없어요. 언제든 출발하세요!"
      />
    </View>
  );
}

const classifyWeatherDays = (weatherList: WeatherDTO[]) => {
  const avoidDays: WeatherDTO[] = [];
  const idealDays: WeatherDTO[] = [];

  weatherList.forEach(weather => {
    const temperature = Number(weather.temperature);
    const {eWeatherCondition} = weather;

    const isExtremeHeat = temperature >= 35;
    const isExtremeCold = temperature <= -12;
    const isBadWeather =
      eWeatherCondition === 'RAIN' ||
      eWeatherCondition === 'SNOW' ||
      eWeatherCondition === 'RAIN_AND_SNOW';

    if (isExtremeHeat || isExtremeCold || isBadWeather) {
      avoidDays.push(weather);
    } else {
      idealDays.push(weather);
    }
  });

  return {avoidDays, idealDays};
};
