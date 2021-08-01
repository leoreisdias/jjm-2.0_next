import { motion } from 'framer-motion';
import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const WeatherForecastContainer = styled(motion.article)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  color: ${(props) =>
    props.theme.title == 'dark'
      ? darken(0.9, props.theme.colors.title)
      : props.theme.colors.white};

  border: none;
`;

export const Today = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0.5rem;

  padding: 1rem;

  width: 100%;

  border-radius: 10px;

  background: linear-gradient(
    180deg,
    ${(props) => lighten(0.4, props.theme.colors.jjmPallete_1)},
    ${(props) => lighten(0.0, props.theme.colors.jjmPallete_1)}
  );

  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const CityMaxMin = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 2.2rem;
    font-family: 'Nunito';
  }

  p {
    font-size: 2rem;
    font-family: Archivo;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    strong {
      font-size: 1.8rem;
    }

    p {
      display: flex;
      flex-direction: row;

      & span:last-child {
        margin-left: 0.25rem;
      }
    }
  }
`;

export const TodayWeatherDetail = styled.div`
  grid-row: 2 / x span;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  justify-items: flex-start;

  font-family: Archivo;

  & div:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      margin-bottom: 0.875rem;

      strong {
        display: block;
        font-size: 2rem;
      }

      & strong:last-child {
        font-size: 1.6rem;
      }
    }

    p + span {
      margin-bottom: 0.25rem;
    }

    span {
      font-size: 1.3rem;
    }
  }

  & div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      max-width: 200px;
      width: 100%;
      margin-bottom: -2rem;
    }

    strong {
      display: block;
      font-size: 4.5rem;
      font-family: 'Archivo';
    }

    & strong:last-child {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;

    & div:nth-child(2) {
      img {
        margin-left: 2.5rem;
      }

      strong {
        font-size: 3.5rem;
      }

      text-align: center;
    }
  }
`;

export const NextDays = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  width: 100%;

  gap: 0.25rem;
  padding-top: 1rem;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

export const EachDay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem;

  border-radius: 10px;

  background: linear-gradient(
    180deg,
    ${(props) => lighten(0.4, props.theme.colors.jjmPallete_1)},
    ${(props) => lighten(0.0, props.theme.colors.jjmPallete_1)}
  );

  strong {
    font-size: 1rem;
  }

  p {
    margin-bottom: 0.2rem;

    span {
      font-size: 1rem;
      font-weight: bold;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: 400px) {
    justify-content: space-around;
    strong {
      font-size: 1.2rem;
    }
    p {
      display: flex;
      gap: 0.5rem;

      span {
        font-size: 1.6rem;
      }
    }
  }
`;
