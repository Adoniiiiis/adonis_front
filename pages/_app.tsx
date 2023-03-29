import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from './../Redux/Store';
import { AuthProvider } from '@/context/AuthContext';
import { CookiesProvider } from 'react-cookie';
import ProtectRoute from '@/components/ProtectRoute';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <CookiesProvider>
        <AuthProvider>
          <ProtectRoute router={router}>
            <Component {...pageProps} />
          </ProtectRoute>
        </AuthProvider>
      </CookiesProvider>
    </Provider>
  );
}
