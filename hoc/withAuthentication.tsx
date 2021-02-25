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

    return session ? (
      <WrappedComponent {...props} />
    ) : (
      <div className="flex items-center justify-center h-screen w-full">
        loading...
      </div>
    );
  };

  return RequiresAuthentication;
}

export default withAuthentication;
