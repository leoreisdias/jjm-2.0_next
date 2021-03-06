import styled from 'styled-components';

export const WriterSection = styled.section`
  width: 90%;
  max-width: 700px;
  margin-top: 1rem;

  margin-bottom: 1rem;

  h3 {
    margin-bottom: 1rem;
    text-align: center;
    color: ${(props) => props.theme.colors.title};

    font-family: 'Nunito';
  }
`;
