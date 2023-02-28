'use client';

import { Fragment } from 'react';
import useSWR from 'swr';

import {
  SpotifyPaginatedResponse,
  SpotifyTimeRange,
  SpotifyTrack,
} from '@/models/Spotify';
import TrackCard, { TrackCardSkeleton } from '@/components/TrackCard';
import SkeletonList from '@/components/SkeletonList';
import { isQueryParamValidSpotifyRange } from '@/lib/utils';
import { NewAPIRoute } from '@/models/APIRoute.enum';
import Heading from '@/components/Heading';
import TimeRangeControls from '@/components/TimeRangeControls';
import { RoutePath } from '@/models/RoutePath.enum';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Tracks({ searchParams }: Props) {
  const currentTimeRange = isQueryParamValidSpotifyRange(searchParams.range)
    ? searchParams.range
    : SpotifyTimeRange.LONG_TERM;

  const { data } = useSWR<SpotifyPaginatedResponse<SpotifyTrack>>(
    `${NewAPIRoute.TRACKS}?range=${currentTimeRange}`,
  );

  return (
    <Fragment>
      <div className="flex justify-between items-center flex-col mb-10 md:flex-row">
        <Heading level="h1">Top Tracks</Heading>
        <TimeRangeControls route={RoutePath.TRACKS} className="mt-5 md:mt-0" />
      </div>
      <ul>
        {data ? (
          data.items.map((track) => (
            <li key={track.id}>
              <TrackCard
                id={track.id}
                name={track.name}
                album={track.album}
                duration={track.duration_ms}
                artists={track.artists}
              />
            </li>
          ))
        ) : (
          <SkeletonList skeletonComponent={<TrackCardSkeleton />} />
        )}
      </ul>
    </Fragment>
  );
}
