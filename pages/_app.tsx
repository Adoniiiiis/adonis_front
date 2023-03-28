import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from './../Redux/Store';
import { AuthProvider } from '@/context/AuthContext';
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </CookiesProvider>
    </Provider>
  );
}
