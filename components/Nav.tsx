'use client';

import Link from 'next/link';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';

import HistoryIcon from '../public/static/icons/history.svg';
import ProfileIcon from '../public/static/icons/profile_icon.svg';
import SpotifyLogo from '../public/static/icons/spotify_logo.svg';
import TracksIcon from '../public/static/icons/tracks.svg';
import MicrophoneIcon from '../public/static/icons/mic.svg';

import { RoutePath } from '@/models/RoutePath.enum';

const navItems = [
  {
    name: 'Profile',
    href: RoutePath.DASHBOARD,
    icon: <ProfileIcon className="fill-current" />,
  },
  {
    name: 'Top Tracks',
    href: RoutePath.TRACKS,
    icon: <TracksIcon className="fill-current" />,
  },
  {
    name: 'Top Artists',
    href: RoutePath.ARTISTS,
    icon: <MicrophoneIcon className="fill-current" />,
  },
  {
    name: 'Recent',
    href: RoutePath.RECENT,
    icon: <HistoryIcon className="fill-current" />,
  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-20 h-16 md:h-20 bg-black w-full shadow-lg">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto px-0 md:px-16 lg:px-28 h-full">
        <Link
          href={RoutePath.DASHBOARD}
          className="hidden md:block w-36 py-4"
          aria-label="Return to dashboard"
        >
          <SpotifyLogo />
        </Link>
        <div className="flex items-center justify-around md:justify-end h-full w-full">
          {navItems.map((navItem) => (
            <Link
              key={navItem.href}
              href={navItem.href}
              className={classnames(
                'text-xs flex items-center flex-col justify-center h-full px-4 md:px-8 border-b-2 border-black hover:bg-spotify-gray hover:text-white hover:border-spotify-green transition duration-200',
                {
                  'text-white bg-spotify-gray border-b-2 border-spotify-green':
                    pathname === navItem.href,
                  'text-gray-400': pathname !== navItem.href,
                },
              )}
            >
              <div className="h-5 w-5 md:h-6 md:w-6 mb-1">{navItem.icon}</div>
              <span>{navItem.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}