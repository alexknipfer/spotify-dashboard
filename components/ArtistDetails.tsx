import Image from 'next/image';

import Button from './Button';

import { SpotifyArtist } from '@/models/Spotify';
import Heading from '@/components/Heading';

interface Props {
  artist: SpotifyArtist;
  isLoading: boolean;
}

const ArtistDetails = ({ artist, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row items-center animate-pulse">
        <div className="rounded-full w-52 h-52 bg-gray-400 mb-5 md:mr-5" />
        <div>
          <div className="w-56 bg-gray-400 h-7 mb-5" />
          <div className="w-64 bg-gray-400 h-3" />
        </div>
      </div>
    );
  }

  return (
    <article className="flex flex-col md:flex-row items-center">
      <Image
        width={208}
        height={208}
        src={artist.images[0].url}
        className="rounded-full"
        priority
        alt={`Artist image for ${artist.name}`}
      />
      <div className="mt-5 text-center md:text-left md:ml-5">
        <Heading level="h1">{artist.name}</Heading>
        <div className="flex my-5 flex-wrap justify-center md:justify-start">
          {artist.genres.map((genre) => (
            <div
              key={genre}
              className="px-2 py-1 bg-black text-white text-xs rounded inline-block mr-2 mb-2"
            >
              {genre}
            </div>
          ))}
        </div>
        <Button
          variant="primary"
          buttonSize="small"
          hrefExternal={artist.external_urls.spotify}
        >
          Listen on Spotify
        </Button>
      </div>
    </article>
  );
};

export default ArtistDetails;
