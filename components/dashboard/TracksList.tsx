import TrackCard from '@/components/TrackCard';
import { SpotifyPaginatedResponse, SpotifyTrack } from '@/models/Spotify';

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
