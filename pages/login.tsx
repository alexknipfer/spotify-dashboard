import { signIn } from 'next-auth/react';

import Button from '@/components/Button';
import Heading from '@/components/Heading';

export default function Login() {
  return (
    <>
      <Heading level="h1" className="mb-10">
        Spotify Profile
      </Heading>
      <Button
        variant="primary"
        onClick={() => signIn('spotify', { callbackUrl: '/dashboard' })}
      >
        Log in to Spotify
      </Button>
    </>
  );
}
