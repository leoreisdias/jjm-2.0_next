import styled from 'styled-components';

export const FooterContainer = styled.footer`
  height: 100%;
  background: #000;
  color: ${(props) => props.theme.colors.white};

  padding: 2rem 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  justify-items: flex-start;
`;

export const AboutJJM = styled.div`
  width: 70%;
  justify-self: flex-end;
  padding-right: 4rem;

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
  width: 80%;
  padding-left: 4rem;

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
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.5rem 0.45rem;
    border-radius: 2.5px;

    list-style: none;
    background: ${(props) => props.theme.colors.gray900};
  }
`;

export const DevelopedBy = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 0.875rem;

  span {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
`;
