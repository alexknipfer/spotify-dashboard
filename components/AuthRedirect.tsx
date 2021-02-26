import { Fragment, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CustomPage } from '@/interfaces/CustomPage';
import {
  NoPageFlicker,
  NO_PAGE_FLICKER_CLASSNAME,
} from '@/components/NoPageFlicker';
import { useSession } from 'next-auth/client';

type AppRedirectProps = Pick<
  CustomPage,
  | 'redirectAuthenticatedTo'
  | 'redirectUnauthenticatedTo'
  | 'suppressFirstRenderFlicker'
>;

const AuthRedirect: React.FC<AppRedirectProps> = ({ children, ...props }) => {
  const router = useRouter();
  const [session, loading] = useSession();

  const handleAuthRedirect = useCallback(
    (redirectAuthenticatedTo?: string, redirectUnauthenticatedTo?: string) => {
      if (typeof window === 'undefined') {
        return;
      }

      if (session) {
        if (redirectAuthenticatedTo) {
          router.replace(redirectAuthenticatedTo);

          return true;
        }
      } else {
        if (redirectUnauthenticatedTo) {
          const url = new URL(redirectUnauthenticatedTo, window.location.href);
          url.searchParams.append('next', window.location.pathname);
          router.replace(url.toString());

          return true;
        }
      }

      return false;
    },
    [router, session],
  );

  const noPageFlicker =
    props.suppressFirstRenderFlicker ||
    props.redirectAuthenticatedTo ||
    props.redirectUnauthenticatedTo;

  useEffect(() => {
    if (loading) {
      return;
    }

    const didRedirect = handleAuthRedirect(
      props.redirectAuthenticatedTo,
      props.redirectUnauthenticatedTo,
    );

    if (!didRedirect) {
      document.documentElement.classList.add(NO_PAGE_FLICKER_CLASSNAME);
    }
  }, [
    props.redirectAuthenticatedTo,
    props.redirectUnauthenticatedTo,
    handleAuthRedirect,
    loading,
  ]);

  return (
    <Fragment>
      {noPageFlicker && <NoPageFlicker />}
      {children}
    </Fragment>
  );
};

export default AuthRedirect;
