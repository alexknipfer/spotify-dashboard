import Head from 'next/head';
import { NextPage } from 'next';
import { SWRConfig } from 'swr';
import { Provider } from 'next-auth/client';
import { CustomAppProps } from '@/models/CustomPage';
import Meta from '@/components/Meta';

import '../styles/globals.css';

const App: NextPage<CustomAppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <Meta />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
};

export default App;
