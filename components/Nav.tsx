'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import HistoryIcon from '../public/static/icons/history.svg';
import ProfileIcon from '../public/static/icons/profile_icon.svg';
import TracksIcon from '../public/static/icons/tracks.svg';
import MicrophoneIcon from '../public/static/icons/mic.svg';

import { RoutePath } from '@/models/RoutePath.enum';
import { cn } from '@/lib/utils';

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
    <nav className="space-x-4">
      {Object.entries(navItems).map(([path, { name }]) => (
        <Link
          key={path}
          href={path}
          className={cn('text-zinc-50 font-medium text-sm', {
            'text-zinc-400': pathname !== path,
          })}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
