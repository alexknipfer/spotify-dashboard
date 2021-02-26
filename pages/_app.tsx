import AuthRedirect from '@/components/AuthRedirect';
import { Provider } from 'next-auth/client';
import WithSkeleton from '@/components/WithSkeleton';
import { CustomAppProps } from '@/interfaces/CustomPage';
import { pick } from '@/lib/utils';
import { NextPage } from 'next';
import { SWRConfig } from 'swr';

import '../styles/globals.css';

const App: NextPage<CustomAppProps> = ({ Component, pageProps }) => {
  const skeletonLoader = Component.skeletonLoader;

  const authRedirect = pick(
    Component,
    'redirectAuthenticatedTo',
    'redirectUnauthenticatedTo',
    'suppressFirstRenderFlicker',
  );

  return (
    <Provider session={pageProps.session}>
      <AuthRedirect {...authRedirect}>
        <WithSkeleton skeletonLoader={skeletonLoader}>
          <SWRConfig
            value={{
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json()),
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </WithSkeleton>
      </AuthRedirect>
    </Provider>
  );
};

export default App;
