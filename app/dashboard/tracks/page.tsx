import { Fragment } from 'react';

import { SpotifyTimeRange } from '@/models/Spotify';
import TrackCard from '@/components/TrackCard';
import { isQueryParamValidSpotifyRange } from '@/lib/utils';
import { spotifyService } from '@/lib/spotify';
import TimeRangeControls from '@/components/TimeRangeControls';
import { RoutePath } from '@/models/RoutePath.enum';
import Heading from '@/components/Heading';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Tracks({ searchParams }: Props) {
  const currentTimeRange = isQueryParamValidSpotifyRange(searchParams.range)
    ? searchParams.range
    : SpotifyTimeRange.LONG_TERM;

  const data = await spotifyService.getTopTracks(50, currentTimeRange);

  return (
    <Fragment>
      <div className="flex justify-between items-center flex-col mb-10 md:flex-row">
        <Heading level="h1">Top Tracks</Heading>
        <TimeRangeControls route={RoutePath.TRACKS} className="mt-5 md:mt-0" />
      </div>
      <ul>
        {data.items.map((track) => (
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
