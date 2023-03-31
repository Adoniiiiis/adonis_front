import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from './../Redux/Store';
import { AuthProvider } from '@/context/AuthContext';
import { CookiesProvider } from 'react-cookie';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { theme } from './../utils/muiTheme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CookiesProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </CookiesProvider>
      </Provider>
    </ThemeProvider>
  );
}
