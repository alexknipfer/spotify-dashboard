'use client';

import { Fragment } from 'react';

import Button from '@/components/button';
import SkeletonList from '@/components/skeleton-list';
import TrackCard, { TrackCardSkeleton } from '@/components/track-card';
import usePaginatedData from '@/hooks/use-paginated-data';
import { APIRoute } from '@/types/api-route.enum';
import { PlaylistTrack } from '@/types/spotify.interface';

interface Props {
  playlistId: string;
}

export default function Tracks({ playlistId }: Props) {
  const {
    data,
    size,
    setSize,
    isReachingEnd,
    isLoadingInitialData,
    isLoadingMore,
  } = usePaginatedData<PlaylistTrack>({
    url: `${APIRoute.PLAYLISTS}/${playlistId}/tracks`,
    defaultLoadCount: '50',
  });

  return (
    <Fragment>
      <div className="mt-10" />
      {isLoadingInitialData && (
        <SkeletonList rows={20} skeletonComponent={<TrackCardSkeleton />} />
      )}

      {data.map((track, index) => (
        <ul key={index}>
          <li>
            <TrackCard
              id={track.track.id}
              name={track.track.name}
              album={track.track.album}
              duration={track.track.duration_ms}
              artists={track.track.artists}
            />
          </li>
        </ul>
      ))}

      {isLoadingMore && (
        <SkeletonList rows={5} skeletonComponent={<TrackCardSkeleton />} />
      )}
      {!isReachingEnd && (
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
