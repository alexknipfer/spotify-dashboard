import { Fragment } from 'react';

// import { SpotifyTimeRange } from '@/models/Spotify';
import TrackCard from '@/components/TrackCard';
// import { isQueryParamValidSpotifyRange } from '@/lib/utils';
import { spotifyService } from '@/lib/spotify';
import { SpotifyTimeRange } from '@/models/Spotify';

// interface Props {
//   searchParams: { [key: string]: string | string[] | undefined };
// }

export default async function Tracks() {
  // const currentTimeRange = isQueryParamValidSpotifyRange(searchParams.range)
  //   ? searchParams.range
  //   : SpotifyTimeRange.LONG_TERM;

  const data = await spotifyService.getTopTracks(
    20,
    SpotifyTimeRange.LONG_TERM,
  );

  return (
    <Fragment>
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
