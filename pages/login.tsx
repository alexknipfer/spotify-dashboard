import Button from '@/components/Button';
import Heading from '@/components/Heading';
import AuthLayout from '@/layouts/AuthLayout';
import { CustomPage } from '@/models/CustomPage';
import { signIn, useSession } from 'next-auth/client';
import {
  NoPageFlicker,
  NO_PAGE_FLICKER_CLASSNAME,
} from '@/components/NoPageFlicker';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LoginPage: CustomPage = () => {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      document.documentElement.classList.add(NO_PAGE_FLICKER_CLASSNAME);
    } else {
      router.replace('/');
    }
  }, [session, router]);

  return (
    <AuthLayout>
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
    </AuthLayout>
  );
};

export default LoginPage;
