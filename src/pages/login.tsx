import { FormEvent, useState } from 'react';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import NoSsr from '@material-ui/core/NoSsr';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
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
