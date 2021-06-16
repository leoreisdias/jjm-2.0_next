import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';

import { Copyright } from '../components/Copyright';
import {
  AvatarUI,
  ButtonSubmitUI,
  FormUI,
  GridContainer,
  GridImageUI,
  PaperDiv,
} from '../styles/pages/Login';

export default function Login() {
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
                Bem Vindo
              </Typography>
              <FormUI noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <ButtonSubmitUI
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Entrar
                </ButtonSubmitUI>

                <Box mt={5}>
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
