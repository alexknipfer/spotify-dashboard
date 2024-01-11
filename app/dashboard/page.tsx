import { Fragment, Suspense } from 'react';

import ArtistsList from './components/artists-list';
import TracksList from './components/tracks-list';
import { ArtistCardSkeleton } from './components/artist-card';

import SkeletonList from '@/components/skeleton-list';
import Button from '@/components/button';
import { RoutePath } from '@/types/route-path.enum';
import { TrackCardSkeleton } from '@/components/track-card';
import { spotifyService } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const topTracksPromise = spotifyService.getTopTracks(10);
  const artistsPromise = spotifyService.getTopArtists(10);

  return (
    <Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
