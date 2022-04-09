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
    const [session, loading] = useSession();

    useEffect(() => {
      if (!session && !loading) {
        router.push('/login');
      }
    }, [session, router, loading]);

    return (
      <Fragment>
        <Meta />
        {session ? <WrappedComponent {...props} /> : <NoPageFlicker />}
      </Fragment>
    );
  };

  return RequiresAuthentication;
}

export default withAuthentication;
