import { SpotifyPlaylist } from '@/models/Spotify';
import Image from 'next/image';
import Heading from './Heading';

interface Props {
  playlist?: SpotifyPlaylist;
  isLoading?: boolean;
}

const PlayListPreviewCard: React.FC<Props> = ({ playlist, isLoading }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-full bg-gray-600" />
        <div className="h-4 w-8/12 bg-gray-600 mt-2" />
      </div>
    );
  }

  return (
    <div className="text-center">
      {playlist.images.length > 0 && (
        <Image src={playlist.images[0]?.url} width={208} height={208} />
      )}
      <Heading level="h3">{playlist.name}</Heading>
      <div className="text-gray-500 text-xs">
        {playlist.tracks.total} TRACKS
      </div>
    </div>
  );
};

export default PlayListPreviewCard;
