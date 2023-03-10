import { spotifyService } from '@/lib/spotify';
import TrackCard from '@/components/TrackCard';

export const revalidate = 60;

export default async function Recent() {
  const recentlyPlayed = await spotifyService.getRecentlyPlayed();

  return (
    <ul>
      {recentlyPlayed.items.map(({ track }, index) => (
        <li key={`${track.id}-${index}`}>
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
