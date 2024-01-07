import { Fragment } from 'react';

import Statistic from './Statistic';

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
      </Fragment>
    </header>
  );
}
