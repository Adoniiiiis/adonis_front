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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CookiesProvider>
          <AuthProvider>
            <Component {...pageProps} />
            <ToastifyContainer />
          </AuthProvider>
        </CookiesProvider>
      </Provider>
    </ThemeProvider>
  );
}
