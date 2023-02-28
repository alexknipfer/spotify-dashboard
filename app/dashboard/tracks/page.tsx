'use client';

import { Fragment } from 'react';
import useSWR from 'swr';

import { SpotifyPaginatedResponse, SpotifyTrack } from '@/models/Spotify';
import TrackCard, { TrackCardSkeleton } from '@/components/TrackCard';
import SkeletonList from '@/components/SkeletonList';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Tracks({ searchParams }: Props) {
  const { data, isLoading, error } = useSWR<
    SpotifyPaginatedResponse<SpotifyTrack>
  >(`/api/dashboard/tracks`);
  console.error({ searchParams });
  // const currentTimeRange = isQueryParamValidSpotifyRange(searchParams.range)
  //   ? searchParams.range
  //   : SpotifyTimeRange.LONG_TERM;

  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect('/login');
  // }

  // const topTracks = await getTopTracks<SpotifyPaginatedResponse<SpotifyTrack>>(
  //   session.accessToken,
  //   50,
  //   currentTimeRange,
  // );

  if (isLoading) {
    return <SkeletonList skeletonComponent={<TrackCardSkeleton />} />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <Fragment>
      <ul>
        {data?.items.map((track) => (
          <li key={track.id}>
            <TrackCard
              id={track.id}
              name={track.name}
              album={track.album}
              duration={track.duration_ms}
              artists={track.artists}
            />
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
