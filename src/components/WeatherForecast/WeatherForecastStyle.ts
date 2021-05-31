import styled from 'styled-components';

export const WeatherForecastContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  padding: 2rem auto;
  width: 100%;
  height: 100vh;

  legend {
    font: 700 2.4rem Archivo;
    color: ${(props) => props.theme.colors.gray800};
    background: ${(props) => props.theme.colors.white};
    margin-bottom: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray500};
  }
`;

export const Today = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background: linear-gradient(#ffd89b, #19547b);

  -webkit-box-shadow: 3px 3px 10px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 3px 3px 10px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 3px 3px 10px 0px rgba(50, 50, 50, 0.75);
`;
