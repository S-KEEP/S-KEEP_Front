import {useQuery} from '@tanstack/react-query';
import {GET} from '../../../apis/client';
import {WEATHER_KEYS} from '../QueryKeys';
import {WeatherDTO} from '../../../types/dtos/weather';

export interface GetWeatherRequest {
  x: string;
  y: string;
  address: string;
}

export interface GetWeatherResponse {
  weatherDtoList: WeatherDTO[];
}

/**
 *  날씨 조회
 */
export const getWeather = async ({x, y, address}: GetWeatherRequest) => {
  const {data} = await GET<GetWeatherResponse>(
    `/api/weather?x=${x}&y=${y}&address=${address}`,
  );

  if (data.errorCode) throw new Error(`${data.errorCode}: ${data.message}`);
  return data.result;
};

export const useGetWeather = (req: GetWeatherRequest) => {
  const QUERY_KEY = WEATHER_KEYS.detail(req);

  const {data, isLoading, isError, error, refetch} = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getWeather(req).then(res => res),
  });

  return {data, isLoading, isError, error, refetch};
};
