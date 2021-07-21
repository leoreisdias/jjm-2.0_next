import { Avatar, Button, Grid } from '@material-ui/core';
import styled from 'styled-components';

export const GridContainer = styled(Grid)`
  height: 100vh;
`;

export const GridImageUI = styled(Grid)`
  background-image: url('https://source.unsplash.com/random');
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.colors.gray50};
  background-size: cover;
  background-position: center;
`;

export const PaperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export const AvatarUI = styled(Avatar)`
  margin: 1rem;
  width: 1rem;
  padding: 2rem;

  img {
    padding: 2rem;
    width: 8.5rem;
    height: 8.5rem;
  }
`;

export const FormUI = styled.form`
  width: 100%;
  margin-top: 1rem;
`;

export const ButtonSubmitUI = styled(Button)`
  margin: 0.3rem 0 2px;
`;
