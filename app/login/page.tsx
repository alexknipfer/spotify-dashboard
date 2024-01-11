import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { RoutePath } from '../../@/types/route-path.enum';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

import LoginButton from './components/LoginButton';

import Heading from '@/components/heading';

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(RoutePath.DASHBOARD);
  }

  return (
    <>
      <Heading level="h1" className="mb-10">
        Spotify Profile
      </Heading>
      <LoginButton />
    </>
  );
}
