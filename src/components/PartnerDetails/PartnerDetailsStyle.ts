import styled from 'styled-components';

export const PartnerDetailContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: 'Nunito';

  gap: 1rem;

  width: 100%;
  color: black;

  border: none;

  strong {
    color: ${(props) => props.theme.colors.gray900};
  }
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.jjmPallete_1};
`;

export const Content = styled.div`
  line-height: 1.75rem;
  text-align: left;
  padding: 0 2rem;
  max-width: 100%;
  word-wrap: break-word;

  span {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;

    strong {
      display: inline;
    }
  }
`;

export const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  a {
    text-decoration: none;
  }

  button {
    border: none;

    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;

    max-width: 100%;

    font: 400 1rem Archivo;
    color: #fefefe;

    padding: 0.75rem 1.25rem;
    border-radius: 10px;

    &:hover {
      filter: brightness(0.9);
    }
  }

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const WhatsAppButton = styled.button`
  background: linear-gradient(to right, #17b395, #056b5d);
`;

export const FacebookButton = styled.button`
  background: linear-gradient(to right, #1d75a5, #172ab3);
`;
