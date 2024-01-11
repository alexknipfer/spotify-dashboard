import Link from 'next/link';

import SpotifyLogo from '../../public/static/icons/spotify_logo.svg';
import NavProfileMenu from '../nav-profile-menu';

import Nav from './Nav';
import MobileNavSheet from './MobileNavSheet';

import { RoutePath } from '@/types/route-path.enum';

export default async function TopMenu() {
  return (
    <header className="flex items-center justify-between h-16 sticky top-0 z-50 border-b border-zinc-800 backdrop-blur supports-[backdrop-filter]:bg-background/70 px-6 md:px-16 lg:px-28 max-w-screen-2xl mx-auto">
      <div className="flex items-center">
        <Link
          href={RoutePath.DASHBOARD}
          className="hidden md:block w-24 mr-6"
          aria-label="Return to dashboard"
        >
          <SpotifyLogo />
        </Link>
        <MobileNavSheet />
        <Nav />
      </div>
      <NavProfileMenu />
    </header>
  );
}
