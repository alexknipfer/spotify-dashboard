import Button from '@/components/Button';
import Heading from '@/components/Heading';
import AuthLayout from '@/layouts/AuthLayout';
import { CustomPage } from '@/interfaces/CustomPage';
import { signIn } from 'next-auth/client';

const LoginPage: CustomPage = () => {
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

LoginPage.redirectAuthenticatedTo = '/';

export default LoginPage;
