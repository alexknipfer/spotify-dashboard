import { Fragment, Suspense } from 'react';

import DashboardHeader from './components/DashboardHeader';
import ArtistsList from './components/ArtistsList';
import TracksList from './components/TracksList';
import { ArtistCardSkeleton } from './components/ArtistCard';

import SkeletonList from '@/components/SkeletonList';
import Button from '@/components/Button';
import { RoutePath } from '@/models/RoutePath.enum';
import { TrackCardSkeleton } from '@/components/TrackCard';
import { spotifyService } from '@/lib/spotify';

export default async function Dashboard() {
  const topTracksPromise = spotifyService.getTopTracks(10);
  const artistsPromise = spotifyService.getTopArtists(10);

  return (
    <Fragment>
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
            <TracksList promise={topTracksPromise} />
          </Suspense>
        </section>
      </div>
    </Fragment>
  );
}
