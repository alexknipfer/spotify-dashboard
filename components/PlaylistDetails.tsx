import { SpotifyPlaylist } from '@/models/Spotify';
import Heading from '@/components/Heading';

import Button from './Button';

interface Props {
  playlist: SpotifyPlaylist;
  isLoading: boolean;
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
      <div className="mt-5 text-center md:text-left md:ml-5">
        <Heading level="h1">{playlist.name}</Heading>

        <Button
          variant="primary"
          buttonSize="small"
          href={playlist.external_urls.spotify}
        >
          Listen on Spotify
        </Button>
      </div>
    </article>
  );
};

export default PlayListDetails;
