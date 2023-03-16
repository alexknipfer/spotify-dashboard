import { spotifyService } from '@/lib/spotify';
import TrackCard from '@/components/TrackCard';
import { SpotifyTimeRange } from '@/models/Spotify';

export default async function Recent() {
  const data = await spotifyService.getTopTracks(
    20,
    SpotifyTimeRange.LONG_TERM,
  );

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
