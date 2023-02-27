import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Button from '@/components/Button';
import Heading from '@/components/Heading';
import { CustomPage } from '@/models/CustomPage';
import {
  NoPageFlicker,
  NO_PAGE_FLICKER_CLASSNAME,
} from '@/components/NoPageFlicker';

const Login: CustomPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'authenticated' && status !== 'loading') {
      document.documentElement.classList.add(NO_PAGE_FLICKER_CLASSNAME);
    } else {
      router.replace('/login');
    }
  }, [status, router]);

  return (
    <>
      <NoPageFlicker />
      <Heading level="h1" className="mb-10">
        Spotify Profile
      </Heading>
      <Button
        variant="primary"
        onClick={() => signIn('spotify', { callbackUrl: '/' })}
      >
        Log in to Spotify
      </Button>
    </>
  );
};

export default Login;
