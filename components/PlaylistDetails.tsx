import { SpotifyPlaylist } from '@/models/Spotify';
import Heading from '@/components/Heading';

import Button from './Button';

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
    <div className="grid grid-cols-3 gap-2">
      <div>1</div>
      <div>9</div>
    </div>
  );
};

export default PlayListDetails;
