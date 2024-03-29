import { SpotifyTimeRange } from '@/types/spotify.interface';
import TrackCard from '@/components/track-card';
import { isQueryParamValidSpotifyRange } from '@/lib/utils';
import { spotifyService } from '@/lib/spotify';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Tracks({ searchParams }: Props) {
  const currentTimeRange = isQueryParamValidSpotifyRange(searchParams.range)
    ? searchParams.range
    : SpotifyTimeRange.LONG_TERM;

  const data = await spotifyService.getTopTracks(20, currentTimeRange);

  return (
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
  );
}
