import Image from 'next/image';

import { SpotifyPlaylist } from '@/types/spotify.interface';
import Heading from '@/components/heading';

interface Props {
  playlist: SpotifyPlaylist;
}

export default function PlaylistDetails({ playlist }: Props) {
  return (
    <article className="flex flex-col md:flex-row items-center">
      <Image
        width={208}
        height={208}
        src={playlist.images[0].url}
        className="rounded-none"
        priority
        alt={`Image for playlist ${playlist.name}`}
      />
      <div className="text-center md:text-left md:ml-5">
        <Heading level="h1">{playlist.name}</Heading>
        <h2 className="text-gray-400 text-xl mt-2">{playlist.description}</h2>
        <h3 className="text-gray-400 text-base">
          {playlist.tracks.total}{' '}
          {playlist.tracks.total === 1 ? 'Track' : 'Tracks'}
        </h3>

        <h3 className="text-gray-400 text-base mb-5">
          {playlist.followers.total}{' '}
          {playlist.followers.total === 1 ? 'Follower' : 'Followers'}
        </h3>
      </div>
    </article>
  );
}

export function PlaylistDetailsSkeleton() {
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
