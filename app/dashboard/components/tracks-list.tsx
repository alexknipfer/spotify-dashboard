import TrackCard from '@/components/track-card';
import {
  SpotifyPaginatedResponse,
  SpotifyTrack,
} from '@/types/spotify.interface';

interface Props {
  promise: Promise<SpotifyPaginatedResponse<SpotifyTrack>>;
}

export default async function TracksList({ promise }: Props) {
  const tracks = await promise;

  return (
    <ul>
      {tracks.items.map((trackDetails) => (
        <li key={trackDetails.id}>
          <TrackCard
            id={trackDetails.id}
            name={trackDetails.name}
            duration={trackDetails.duration_ms}
            artists={trackDetails.artists}
            album={trackDetails.album}
          />
        </li>
      ))}
    </ul>
  );
}
