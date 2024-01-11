import Image from 'next/image';

import { SpotifyTrack } from '@/types/spotify.interface';
import Heading from '@/components/heading';
import Button from '@/components/button';

interface Props {
  track: SpotifyTrack;
}

export default function TrackDetails({ track }: Props) {
  return (
    <article className="flex flex-col md:flex-row items-center">
      <Image
        width={208}
        height={208}
        src={track.album.images[0].url}
        priority
        alt={`Album image for ${track.album.name}`}
      />
      <div className="text-center mt-5 md:mt-0 md:text-left md:ml-10">
        <Heading level="h1">{track.name}</Heading>
        <h2 className="text-gray-400 text-xl mt-2">
          {track.artists.map((artist) => artist.name).join(', ')}
        </h2>
        <h3 className="text-gray-400 text-base mb-5">
          {track.album.name} -{' '}
          {new Date(track.album.release_date).getFullYear()}
        </h3>
        <Button
          variant="primary"
          buttonSize="small"
          hrefExternal={track.external_urls.spotify}
        >
          Listen on Spotify
        </Button>
      </div>
    </article>
  );
}

export function TrackDetailsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center animate-pulse">
      <div className="w-52 h-52 bg-gray-400 mb-5 md:mr-5" />
      <div className="flex flex-col items-center md:items-start">
        <div className="w-56 bg-gray-400 h-7 mb-2" />
        <div className="w-40 bg-gray-400 h-5 mb-2" />
        <div className="w-40 bg-gray-400 h-4" />
      </div>
    </div>
  );
}
