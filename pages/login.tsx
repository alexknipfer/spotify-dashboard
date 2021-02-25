import Button from '@/components/button';
import Heading from '@/components/heading';
import AuthLayout from '@/layouts/auth-layout';
import { NextPage } from 'next';
import { signIn } from 'next-auth/client';

const Login: NextPage = () => {
  return (
    <AuthLayout>
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

export default Login;
