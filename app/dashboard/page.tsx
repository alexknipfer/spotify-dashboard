import { Fragment, Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

import {
  SpotifyArtist,
  SpotifyPaginatedResponse,
  SpotifyTrack,
} from '@/models/Spotify';
import { ArtistCardSkeleton } from '@/components/ArtistCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SkeletonList from '@/components/SkeletonList';
import Button from '@/components/Button';
import { RoutePath } from '@/models/RoutePath.enum';
import { getTopArtists, getTopTracks } from '@/lib/spotify';
import ArtistsList from '@/components/dashboard/ArtistsList';
import { TrackCardSkeleton } from '@/components/TrackCard';
import TracksList from '@/components/dashboard/TracksList';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const topTracksPromise = getTopTracks<SpotifyPaginatedResponse<SpotifyTrack>>(
    session.accessToken,
    10,
  );
  const artistsPromise = getTopArtists<SpotifyPaginatedResponse<SpotifyArtist>>(
    session.accessToken,
    10,
  );

  return (
    <Fragment>
      {/* @ts-expect-error Server Component */}
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20">
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg md:text-xl font-bold">
              Top Artists of All Time
            </h2>
            <Button
              variant="outline"
              buttonSize="small"
              hrefInternal={RoutePath.ARTISTS}
            >
              See More
            </Button>
          </div>
          <Suspense
            fallback={
              <SkeletonList skeletonComponent={<ArtistCardSkeleton />} />
            }
          >
            {/* @ts-expect-error Server Component */}
            <ArtistsList promise={artistsPromise} />
          </Suspense>
        </section>
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg md:text-xl font-bold">
              Top Tracks of All Time
            </h2>
            <Button
              variant="outline"
              buttonSize="small"
              hrefInternal={RoutePath.TRACKS}
            >
              See More
            </Button>
          </div>
          <Suspense
            fallback={
              <SkeletonList skeletonComponent={<TrackCardSkeleton />} />
            }
          >
            {/* @ts-expect-error Server Component */}
            <TracksList promise={topTracksPromise} />
          </Suspense>
        </section>
      </div>
    </Fragment>
  );
}
