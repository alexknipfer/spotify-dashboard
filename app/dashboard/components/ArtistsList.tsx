import ArtistCard from './ArtistCard';

import { SpotifyArtist, SpotifyPaginatedResponse } from '@/models/Spotify';

interface Props {
  promise: Promise<SpotifyPaginatedResponse<SpotifyArtist>>;
}

export default async function ArtistsList({ promise }: Props) {
  const artists = await promise;

  return (
    <ul>
      {artists.items.map((artistDetails) => (
        <li key={artistDetails.id}>
          <ArtistCard
            id={artistDetails.id}
            name={artistDetails.name}
            image={artistDetails.images[0]}
          />
        </li>
      ))}
    </ul>
  );
}
