import { NextPage } from 'next';
import { SWRConfig } from 'swr';
import { Provider } from 'next-auth/client';
import { useState } from 'react';
import { CustomAppProps } from '@/models/CustomPage';
import NowPlaying from '@/components/NowPlaying';

import '../styles/globals.css';

const App: NextPage<CustomAppProps> = ({ Component, pageProps }) => {
  const [isNowPlayingVisible, setNowPlayingVisible] = useState(false);

  return (
    <Provider session={pageProps.session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <NowPlaying
          isVisible={isNowPlayingVisible}
          onToggleVisible={() => setNowPlayingVisible((prev) => !prev)}
        />
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
};

export default App;
