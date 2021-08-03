import { FormEvent, useState } from 'react';

import { Grid, Typography } from '@material-ui/core';
import NoSsr from '@material-ui/core/NoSsr';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

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

const Box = dynamic(() => import('@material-ui/core/Box'));
const CssBaseline = dynamic(() => import('@material-ui/core/CssBaseline'));
const FormControl = dynamic(() => import('@material-ui/core/FormControl'));
const IconButton = dynamic(() => import('@material-ui/core/IconButton'));
const InputAdornment = dynamic(() => import('@material-ui/core/InputAdornment'));
const InputLabel = dynamic(() => import('@material-ui/core/InputLabel'));
const OutlinedInput = dynamic(() => import('@material-ui/core/OutlinedInput'));
const Paper = dynamic(() => import('@material-ui/core/Paper'));
const Snackbar = dynamic(() => import('@material-ui/core/Snackbar'));
const TextField = dynamic(() => import('@material-ui/core/TextField'));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  const { handleLogin, username, hasLoginFailed, handleLoginFailed } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  function handleLoginButton(e: FormEvent) {
    e.preventDefault();
    if (email && password) handleLogin(email, password);
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
                <Image
                  src="/pwa_icon.webp"
                  alt="JJM"
                  width={120}
                  height={120}
                  objectFit="contain"
                />
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
                <FormControl
                  style={{ width: '100%', marginBottom: '1rem' }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowPassword((oldShowPassword) => !oldShowPassword)
                          }
                          edge="end"
                        >
                          {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>

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
        <Snackbar
          open={hasLoginFailed}
          autoHideDuration={6000}
          onClose={handleLoginFailed}
        >
          <Alert severity="error">Email ou senha incorretos!</Alert>
        </Snackbar>
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
