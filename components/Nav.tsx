'use client';

import Link from 'next/link';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { LayoutGroup, motion } from 'framer-motion';

import HistoryIcon from '../public/static/icons/history.svg';
import ProfileIcon from '../public/static/icons/profile_icon.svg';
import SpotifyLogo from '../public/static/icons/spotify_logo.svg';
import TracksIcon from '../public/static/icons/tracks.svg';
import MicrophoneIcon from '../public/static/icons/mic.svg';

import { RoutePath } from '@/models/RoutePath.enum';

const navItems = {
  [RoutePath.DASHBOARD]: {
    name: 'Profile',
    icon: <ProfileIcon width={24} height={24} className="fill-current" />,
  },
  [RoutePath.TRACKS]: {
    name: 'Top Tracks',
    icon: <TracksIcon width={24} height={24} className="fill-current" />,
  },
  [RoutePath.ARTISTS]: {
    name: 'Top Artists',
    icon: <MicrophoneIcon width={24} height={24} className="fill-current" />,
  },
  [RoutePath.RECENT]: {
    name: 'Recent',
    icon: <HistoryIcon width={24} height={24} className="fill-current" />,
  },
};

export default function Nav() {
  const pathname = usePathname();

  return (
    <LayoutGroup>
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
            {Object.entries(navItems).map(([path, { name, icon }]) => (
              <Link
                key={path}
                href={path}
                className={classnames('h-full', {
                  'text-gray-400': pathname !== path,
                })}
              >
                <span className="relative text-xs flex items-center flex-col justify-center h-full px-4 md:px-8 border-black hover:text-white transition duration-200">
                  <div className="h-5 w-5 md:h-6 md:w-6 mb-1">{icon}</div>
                  <span>{name}</span>
                  {path === pathname ? (
                    <motion.div
                      className="absolute inset-0 text-white border-b-2 border-spotify-green"
                      layoutId="navbar"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  ) : null}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </LayoutGroup>
  );
}
