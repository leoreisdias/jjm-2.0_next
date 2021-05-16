import { ThemeProvider } from 'styled-components';

import { Header } from '../components/Header';
import { Topics } from '../components/Topics';
import GlobalStyle from '../styles/global';
import { Main } from '../styles/pages/App';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Topics />
      <Main>
        <Component {...pageProps} />
      </Main>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
