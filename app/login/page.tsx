import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { RoutePath } from '../../models/RoutePath.enum';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

import Heading from '@/components/Heading';
import LoginButton from '@/components/login/LoginButton';

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
