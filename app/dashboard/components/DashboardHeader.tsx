import { Fragment } from 'react';

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

  return (
    <header className="flex flex-col justify-center items-center">
      <Fragment>
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
