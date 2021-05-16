import styled from 'styled-components';

export const AdvertisementContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    -webkit-box-shadow: 0px 4px 30px -9px rgb(0 0 0 / 20%);
    -moz-box-shadow: 0px 4px 30px -9px rgb(0 0 0 / 20%);
    box-shadow: 0px 4px 30px -9px rgb(0 0 0 / 20%);

    margin-bottom: 1rem;
  }

  & ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    list-style: none;
  }
`;
