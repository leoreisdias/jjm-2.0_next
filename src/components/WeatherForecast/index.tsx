import React from 'react';

import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FiWind } from 'react-icons/fi';
import { GiWaterDrop } from 'react-icons/gi';

import { SlowFadeInOut } from '../../assets/motion/Variants';
import { useWeather } from '../../hooks/useWeather';
import { LoadingBird } from '../LoadingBird';
import {
  WeatherForecastContainer,
  Today,
  NextDays,
  CityMaxMin,
  TodayWeatherDetail,
  EachDay,
} from './WeatherForecastStyle';

interface WeatherForecast {
  condition: string;
  date: string;
  description: string;
  max: number;
  min: number;
  weekday: string;
}

interface WeatherProps {
  cid: string;
  city_name: string;
  condition_code: string;
  condition_slug: string;
  currently: string;
  date: string;
  humidity: number;
  img_id: string;
  sunrise: string;
  sunset: string;
  time: string;
  wind_speedy: string;
  city: string;
  description: string;
  forecast: WeatherForecast[];
  temp: number;
}

export const WeatherForecast = () => {
  const { data } = useWeather<WeatherProps>('/');

  if (!data) {
    return <LoadingBird />;
  }

  return (
    <WeatherForecastContainer initial="begin" animate="animate" variants={SlowFadeInOut}>
      <Today>
        <CityMaxMin>
          <strong>{data?.city_name}</strong>
          <p>
            <span>
              <FaArrowUp size={18} color="green" />
              {data?.forecast[0].max}º
            </span>
            <span>
              <FaArrowDown size={18} color="red" />
              {data?.forecast[0].min}º
            </span>
          </p>
        </CityMaxMin>

        <TodayWeatherDetail>
          <div>
            <p lang="pt-br">
              <strong>{data?.forecast[0].weekday}</strong>
              <strong>{data?.date}</strong>
            </p>
            <span>
              <FiWind />: {data?.wind_speedy}
            </span>
            <span>
              <GiWaterDrop />: {data?.humidity}
            </span>
          </div>

          <div>
            <img
              src={`https://assets.hgbrasil.com/weather/images/${data?.img_id}.png`}
              alt="Weather Icon"
            />
            <strong>{data?.temp}º</strong>
            <strong>{data?.description}</strong>
          </div>
        </TodayWeatherDetail>
      </Today>

      <NextDays>
        {data?.forecast.map((weather, index) => {
          return index !== 0 && index !== 9 ? (
            <EachDay key={index}>
              <strong lang="pt-br">
                {weather.weekday}
                <br />
                {weather.date}
              </strong>
              <p>
                <span>
                  <FaArrowUp size={15} color="green" />
                  {weather.max}º
                </span>
                <span>
                  <FaArrowDown size={15} color="red" />
                  {weather.min}º
                </span>
              </p>
            </EachDay>
          ) : (
            ''
          );
        })}
      </NextDays>
    </WeatherForecastContainer>
  );
};
