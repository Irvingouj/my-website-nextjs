// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import Seo from '@/components/Seo';
import '@/styles/colors.css';
import '@/styles/globals.css';
import { RootState, createStore } from '@/utils/redux/store';
import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';




function MyApp({ Component, pageProps }: AppProps<{ serverState: RootState }>) {
  const store = createStore(pageProps);
  return (
    <>
      <Seo />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <Analytics />
    </>
  );
}

export default MyApp;
