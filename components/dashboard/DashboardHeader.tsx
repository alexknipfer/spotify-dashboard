import { Fragment } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

import ProfileIcon from '../../public/static/icons/profile_icon.svg';
import Button from '../Button';

import { RoutePath } from '@/models/RoutePath.enum';
import Statistic from '@/components/dashboard/Statistic';
import {
  getFollowedArtistsCount,
  getPlaylistsTotal,
  getProfile,
} from '@/lib/spotify';

export default async function DashboardHeader() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Not authorized');
  }

  const [profile, followingCount, playlistCount] = await Promise.all([
    getProfile(session.accessToken),
    getFollowedArtistsCount(session.accessToken),
    getPlaylistsTotal(session.accessToken),
  ]);

  return (
    <header
      className={classnames('flex flex-col justify-center items-center', {
        'animate-pulse': false,
      })}
    >
      <Fragment>
        {profile.images.length ? (
          <Image
            src={profile.images[0].url}
            width={160}
            height={160}
            className="rounded-full"
            alt="Spotify profile image"
          />
        ) : (
          <div className="flex justify-center items-center h-40 w-40 border border-white rounded-full p-7">
            <ProfileIcon fill="#fff" width="100%" height="100%" />
          </div>
        )}
        <h1 className="text-white font-bold text-3xl md:text-5xl my-6">
          {profile.display_name}
        </h1>
        <div className="flex mb-10">
          <Statistic label="Followers" count={profile.followers.total} />
          <Statistic label="Following" count={followingCount} />
          <Statistic
            label="Playlists"
            count={playlistCount}
            href={RoutePath.PLAYLIST}
          />
        </div>
        <Button variant="outline" buttonSize="small" isLogout>
          Logout
        </Button>
      </Fragment>
    </header>
  );
}
