import ArtistCard from './ArtistCard';

import {
  SpotifyArtist,
  SpotifyPaginatedResponse,
} from '@/types/spotify.interface';

interface Props {
  promise: Promise<SpotifyPaginatedResponse<SpotifyArtist>>;
}

export default async function ArtistsList({ promise }: Props) {
  const artists = await promise;

  return (
    <ul>
      {artists.items.map((artistDetails) => (
        <li key={artistDetails.id}>
          <ArtistCard artist={artistDetails} />
        </li>
      ))}
    </ul>
  );
}
