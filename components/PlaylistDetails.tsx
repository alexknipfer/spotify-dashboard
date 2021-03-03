import { SpotifyPlaylist } from '@/models/Spotify';
import { SpotifyImage } from '@/models/Spotify';
import Image from 'next/image';
import { Fragment } from 'react';

interface Props {
  playlist?: SpotifyPlaylist;
  isLoading?: boolean;
}

const PlayListDetails: React.FC<Props> = ({ playlist, isLoading }) => {
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
      <div className="flex flex-row space-x-4">
        {playlist.name}
        <div>{playlist.tracks.total}</div>
        {playlist.images.length > 0 && (
          <Image
            src={playlist.images[0]?.url}
            width={208}
            height={208}
            className="rounded-full"
          />
        )}
        <div>3</div>

        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
    </article>
  );
};

export default PlayListDetails;
