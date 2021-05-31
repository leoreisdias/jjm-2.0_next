import styled from 'styled-components';

export const FooterContainer = styled.footer`
  height: 100%;
  background: #000;

  padding: 2rem 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
`;

export const AboutJJM = styled.div`
  width: 50%;

  h2 {
    margin-bottom: 1rem;
  }

  p {
    width: 100%;
    font-size: 0.875rem;
    margin-bottom: 1rem;

    text-align: justify;
  }
`;

export const ParternsTags = styled.div`
  width: 50%;

  h3 {
    margin-bottom: 1rem;
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }

  ul li {
    color: ${(props) => props.theme.colors.white};
    font-size: 0.75rem;

    padding: 0.25rem 0.45rem;
    border-radius: 2.5px;

    list-style: none;
    background: ${(props) => props.theme.colors.gray900};
    box-shadow: 0 0 0 1px white;
  }
`;
