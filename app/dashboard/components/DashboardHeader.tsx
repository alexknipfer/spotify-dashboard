import { Fragment } from 'react';
import Image from 'next/image';

import ProfileIcon from '../../../public/static/icons/profile_icon.svg';

import Statistic from './Statistic';

import Button from '@/components/Button';
import { RoutePath } from '@/models/RoutePath.enum';
import { spotifyService } from '@/lib/spotify';

export default async function DashboardHeader() {
  const [profile, followingCount, playlists] = await Promise.all([
    spotifyService.getProfile(),
    spotifyService.getFollowedArtistsCount(),
    spotifyService.getPlaylists(),
  ]);

  const largestProfileImage = profile.images.length
    ? profile.images.reduce((prev, curr) =>
        prev.height > curr.height ? prev : curr,
      )
    : null;

  return (
    <header className="flex flex-col justify-center items-center">
      <Fragment>
        {largestProfileImage ? (
          <Image
            src={largestProfileImage.url}
            width={160}
            height={160}
            className="rounded-full"
            alt="Spotify profile image"
            priority
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
            count={playlists.total}
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
