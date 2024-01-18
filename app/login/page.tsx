import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '../../pages/api/auth/[...nextauth]';

import LoginButton from './components/login-button';

import Heading from '@/components/heading';
import { DashboardRoutes } from '@/config/route-config';

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(DashboardRoutes.base.template);
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
