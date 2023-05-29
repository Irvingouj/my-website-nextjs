// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import Seo from '@/components/Seo';
import { Database } from '@/lib/database.types';
import '@/styles/colors.css';
import '@/styles/globals.css';
import { RootState, createStore } from '@/utils/redux/store';
import {
  Session,
  createPagesBrowserClient,
} from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider } from 'react-redux';

function MyApp({
  Component,
  pageProps,
}: AppProps<
  { serverState: RootState } & {
    initialSession: Session;
  }
>) {
  const store = createStore(pageProps.serverState);
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());

  return (
    <>
      <Seo />
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionContextProvider>
    </>
  );
}

export default MyApp;
