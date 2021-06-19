import styled from 'styled-components';

export const AdvertisementContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
    list-style: none;

    padding-top: 1rem;
  }
`;
