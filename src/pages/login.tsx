import { FormEvent, useState } from 'react';

import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import { Copyright } from '../components/Copyright';
import { useAuth } from '../hooks/useAuth';
import {
  AvatarUI,
  ButtonSubmitUI,
  FormUI,
  GridContainer,
  GridImageUI,
  PaperDiv,
} from '../styles/pages/Login';

export default function Login() {
  const { handleLogin, username } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLoginButton(e: FormEvent) {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <>
      <Head>
        <title>Login - Jornal JM</title>
      </Head>
      <NoSsr>
        <GridContainer container>
          <CssBaseline />
          <GridImageUI item xs={false} sm={4} md={7} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <PaperDiv>
              <AvatarUI>
                <img src="./logo.png" alt="JJM" />
              </AvatarUI>
              <Typography component="h1" variant="h5">
                Bem vindo Redator
              </Typography>
              <FormUI noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />

                <ButtonSubmitUI
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleLoginButton}
                >
                  Entrar
                </ButtonSubmitUI>

                <Box mt={5}>
                  {username && <p>Olá {username}</p>}
                  <Copyright />
                </Box>
              </FormUI>
            </PaperDiv>
          </Grid>
        </GridContainer>
      </NoSsr>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { token: userToken } = parseCookies(ctx);

  if (userToken) {
    return {
      redirect: {
        destination: '/writer-area',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
