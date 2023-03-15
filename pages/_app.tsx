import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';

import { CustomAppProps } from '@/models/CustomPage';
import CustomSWRConfig from '@/components/CustomSWRConfig';

import '../styles/globals.css';

const App: NextPage<CustomAppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <CustomSWRConfig>
        <Component {...pageProps} />
      </CustomSWRConfig>
    </SessionProvider>
  );
};

export default App;
