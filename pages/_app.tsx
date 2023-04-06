import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from './../Redux/Store';
import { AuthProvider } from '@/context/AuthContext';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './../utils/muiTheme';
import 'react-toastify/dist/ReactToastify.css';
import ToastifyContainer from '@/components/ToastifyContainer';
import { ThemeProvider } from '@emotion/react';
import { cyan, green, orange } from '@mui/material/colors';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: cyan[500],
    },
    success: {
      main: green[500],
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
<<<<<<< HEAD
    <ThemeProvider theme={theme}>
      <Provider store={store}>
=======
    <Provider store={store}>
      <ThemeProvider theme={theme}>
>>>>>>> f636452200a5c6eedbf34bc33750fd0a24a90acf
        <CookiesProvider>
          <AuthProvider>
            <Component {...pageProps} />
            <ToastifyContainer />
          </AuthProvider>
        </CookiesProvider>
<<<<<<< HEAD
      </Provider>
    </ThemeProvider>
=======
      </ThemeProvider>
    </Provider>
>>>>>>> f636452200a5c6eedbf34bc33750fd0a24a90acf
  );
}
