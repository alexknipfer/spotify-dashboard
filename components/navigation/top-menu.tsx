import Link from 'next/link';

import SpotifyLogo from '../../public/static/icons/spotify_logo.svg';
import NavProfileMenu from '../nav-profile-menu';

import Nav from './nav';
import MobileNavSheet from './mobile-nav-sheet';

import { DashboardRoutes } from '@/config/route-config';

export default async function TopMenu() {
  return (
    <header className="h-16 sticky top-0 z-50 border-b border-zinc-800 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex items-center justify-between h-full px-6 md:px-16 lg:px-28 max-w-screen-2xl mx-auto">
        <div className="flex items-center">
          <Link
            href={DashboardRoutes.base.template}
            className="hidden md:block w-24 mr-6"
            aria-label="Return to dashboard"
          >
            <SpotifyLogo />
          </Link>
          <MobileNavSheet />
          <Nav />
        </div>
        <NavProfileMenu />
      </div>
    </header>
  );
}
