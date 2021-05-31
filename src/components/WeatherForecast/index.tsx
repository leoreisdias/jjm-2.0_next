import React, { useEffect, useState } from 'react';

import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FiWind } from 'react-icons/fi';
import { GiWaterDrop } from 'react-icons/gi';

import { useFetch } from '../../hooks/useFetch';
import { weatherApi } from '../../services/weatherApi';
import { WeatherForecastContainer, Today } from './WeatherForecastStyle';

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
  const { data, error } = useFetch<WeatherProps>('/');

  if (!data) {
    return <p>Carregando</p>;
  }

  return (
    <WeatherForecastContainer>
      <legend>Previsão do Tempo</legend>
      <Today>
        <div>
          <strong>{data?.city_name}</strong>
          <p>
            <FaArrowUp size={18} color="green" /> {data?.forecast[0].max}º
            <br />
            <FaArrowDown size={18} color="red" /> {data?.forecast[0].min}º
          </p>
        </div>

        <div>
          <div>
            <p lang="pt-br">
              <strong>{data?.forecast[0].weekday}</strong>
              <br />
              {data?.date}
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
            <strong>{data?.description}</strong>
          </div>

          <div>
            <strong>{data?.temp}º</strong>
          </div>
        </div>
      </Today>

      <div>
        {data?.forecast.map((weather, index) => {
          return index !== 0 && index !== 9 ? (
            <div key={index}>
              <strong lang="pt-br">
                {weather.weekday}
                <br />
                {weather.date}
              </strong>
              <br />
              <div>
                <span>
                  <p>
                    <span>
                      <FaArrowUp size={15} color="green" />
                      {weather.max}º
                    </span>
                    <FaArrowDown size={15} color="red" />
                    {weather.min}º
                  </p>
                </span>
                <strong>{weather.description}</strong>
              </div>
            </div>
          ) : (
            ''
          );
        })}
      </div>
    </WeatherForecastContainer>
  );
};
