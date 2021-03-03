import { SpotifyPlaylist } from '@/models/Spotify';
import Image from 'next/image';

interface Props {
  playlist?: SpotifyPlaylist;
  isLoading?: boolean;
}

const PlayListDetails: React.FC<Props> = ({ playlist, isLoading }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-full rounded-full bg-gray-600 circle" />
        <div className="h-4 w-8/12 bg-gray-600 mt-2" />
        <style jsx>{`
          .circle::before {
            content: '';
            display: block;
            padding-bottom: 100%;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="text-center">
      {playlist.images.length > 0 && (
        <Image
          src={playlist.images[0]?.url}
          width={208}
          height={208}
          className="rounded-full"
        />
      )}
      <div className="block mt-2">{playlist.name}</div>
      <div className="block mt-1 text-gray-500 text-xs">
        {playlist.tracks.total} TRACKS
      </div>
    </div>
  );
};

export default PlayListDetails;
