import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';

import { NoPageFlicker } from '@/components/NoPageFlicker';
import Meta from '@/components/Meta';

function withAuthentication<Props>(
  WrappedComponent: React.ComponentType<Props>,
) {
  const RequiresAuthentication = (props: Props) => {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
      if (status !== 'authenticated' && status !== 'loading') {
        router.push('/login');
      }
    }, [status, router]);

    return (
      <Fragment>
        <Meta />
        {status === 'authenticated' ? (
          <WrappedComponent {...props} />
        ) : (
          <NoPageFlicker />
        )}
      </Fragment>
    );
  };

  return RequiresAuthentication;
}

export default withAuthentication;
