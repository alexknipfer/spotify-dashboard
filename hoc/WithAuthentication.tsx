import { NoPageFlicker } from '@/components/NoPageFlicker';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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

    return session ? <WrappedComponent {...props} /> : <NoPageFlicker />;
  };

  return RequiresAuthentication;
}

export default withAuthentication;
