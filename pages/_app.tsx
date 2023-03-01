import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import CustomSWRConfig from '@/components/CustomSWRConfig';

import '../styles/globals.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <CustomSWRConfig>
        <Component {...pageProps} />
      </CustomSWRConfig>
    </SessionProvider>
  );
};

export default App;
