import { NextPage } from 'next';
import { SWRConfig } from 'swr';
import { Provider } from 'next-auth/client';
import { CustomAppProps } from '@/models/CustomPage';

import '../styles/globals.css';

const App: NextPage<CustomAppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
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
