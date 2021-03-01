import { Fragment } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';

import HistoryIcon from '../public/static/icons/history.svg';
import ProfileIcon from '../public/static/icons/profile_icon.svg';
import SpotifyLogo from '../public/static/icons/spotify_logo.svg';

const navItems = [
  {
    name: 'Profile',
    href: '/',
    icon: <ProfileIcon className="fill-current" />,
  },
  {
    name: 'Recent',
    href: '/recent',
    icon: <HistoryIcon className="fill-current" />,
  },
];

const DashboardLayout: React.FC = ({ children }) => {
  const router = useRouter();

  return (
    <Fragment>
      <nav className="fixed bottom-0 md:sticky md:top-0 z-20 h-16 md:h-20 bg-black w-full shadow-lg px-0 md:px-16 lg:px-28 flex items-center justify-between">
        <div className="hidden md:block w-36 py-4">
          <SpotifyLogo />
        </div>
        <div className="flex items-center h-full">
          {navItems.map((navItem) => (
            <Link key={navItem.href} href={navItem.href}>
              <a
                className={classnames(
                  'text-xs flex items-center flex-col justify-center h-full px-8 border-b-2 border-black hover:bg-spotify-gray hover:text-white hover:border-spotify-green transition duration-200',
                  {
                    'text-white bg-spotify-gray border-b-2 border-spotify-green':
                      router.pathname === navItem.href,
                    'text-gray-400': router.pathname !== navItem.href,
                  },
                )}
              >
                <div className="h-5 w-5 md:h-6 md:w-6 mb-1">{navItem.icon}</div>
                <span>{navItem.name}</span>
              </a>
            </Link>
          ))}
        </div>
      </nav>
      <main className="px-5 md:px-16 lg:px-28 py-10 max-w-screen-2xl mx-auto min-h-screen">
        {children}
      </main>
    </Fragment>
  );
};

export default DashboardLayout;
