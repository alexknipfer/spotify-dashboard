import { Fragment } from 'react';

interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default:
      'Welcome to Spotify Dashboard. Login with your spotify account to view your top tracks, top artists, and more!',
  },
};

export default function LoginLayout({ children }: Props) {
  return (
    <Fragment>
      <main className="flex flex-col justify-center h-screen items-center max-w-screen-2xl mx-auto">
        {children}
      </main>
    </Fragment>
  );
}
