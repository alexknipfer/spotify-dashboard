'use client';
import { signIn } from 'next-auth/react';

import Button from '@/components/button';

export default function LoginButton() {
  return (
    <Button
      variant="primary"
      onClick={() => signIn('spotify', { callbackUrl: '/dashboard' })}
    >
      Log in to Spotify
    </Button>
  );
}
