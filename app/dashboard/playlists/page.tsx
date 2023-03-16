'use client';

import { Fragment } from 'react';

import PlaylistPreviewCard, {
  PlaylistPreviewCardSkeleton,
} from './components/PlaylistPreviewCard';

import Heading from '@/components/Heading';
import SkeletonList from '@/components/SkeletonList';
import usePaginatedData from '@/lib/usePaginatedData';
import Button from '@/components/Button';
import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyPlaylist } from '@/models/Spotify';

export default function Playlists() {
  const {
    data: playlists,
    size,
    setSize,
    isReachingEnd,
    isLoadingInitialData,
    isLoadingMore,
  } = usePaginatedData<SpotifyPlaylist>({ url: APIRoute.PLAYLISTS });

  return (
    <Fragment>
      <Heading level="h1" className="mb-5">
        Your Playlists
      </Heading>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-16">
        {isLoadingInitialData && (
          <SkeletonList
            rows={20}
            skeletonComponent={<PlaylistPreviewCardSkeleton />}
          />
        )}
        {playlists.map((playlist, index) => (
          <PlaylistPreviewCard key={index} playlist={playlist} />
        ))}
        {isLoadingMore && (
          <SkeletonList
            rows={5}
            skeletonComponent={<PlaylistPreviewCardSkeleton />}
          />
        )}
      </div>
      {playlists.length === 0 && (
        <div className="flex justify-center items-center">
          <Heading level="h1" className="text-gray-400 text-center">
            Uh oh, you don&apos;t have any playlists yet!
          </Heading>
        </div>
      )}
      {!isReachingEnd && playlists.length > 0 && (
        <div className="text-center">
          <Button
            variant="outline"
            buttonSize="small"
            onClick={() => setSize(size + 1)}
          >
            Load More
          </Button>
        </div>
      )}
    </Fragment>
  );
}
