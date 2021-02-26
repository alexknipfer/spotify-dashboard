import { useSession } from 'next-auth/client';
import { Fragment } from 'react';

interface Props {
  skeletonLoader: React.ReactNode | undefined;
}

const WithSkeleton: React.FC<Props> = ({ children, skeletonLoader }) => {
  const [session, loading] = useSession();

  if (loading && skeletonLoader && !session) {
    return <Fragment>{skeletonLoader}</Fragment>;
  }

  return <Fragment>{children}</Fragment>;
};

export default WithSkeleton;
