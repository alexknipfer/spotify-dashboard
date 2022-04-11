import { Fragment, PropsWithChildren } from 'react';

import Meta from '@/components/Meta';

const AuthLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Fragment>
      <Meta description="Welcome to Spotify Dashboard. Login with your spotify account to view your top tracks, top artists, and more!" />
      <main className="flex flex-col justify-center h-screen items-center max-w-screen-2xl mx-auto">
        {children}
      </main>
    </Fragment>
  );
};

export default AuthLayout;
