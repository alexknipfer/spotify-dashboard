import Link from 'next/link';

import SpotifyLogo from '../public/static/icons/spotify_logo.svg';

import Nav from './Nav';
import NavProfileMenu from './NavProfileMenu';

import { RoutePath } from '@/models/RoutePath.enum';

export default async function TopMenu() {
  return (
    <div className="flex items-center justify-between h-16 sticky top-0 px-6 md:px-16 lg:px-28 max-w-screen-2xl mx-auto">
      <div className="flex items-center">
        <Link
          href={RoutePath.DASHBOARD}
          className="hidden md:block w-24 mr-6"
          aria-label="Return to dashboard"
        >
          <SpotifyLogo />
        </Link>
        <Nav />
      </div>
      <NavProfileMenu />
    </div>
  );
}
