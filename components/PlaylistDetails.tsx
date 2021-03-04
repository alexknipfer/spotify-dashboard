import { SpotifyPlaylist } from '@/models/Spotify';
import Image from 'next/image';
import Heading from '@/components/Heading';
import Anchor from '@/components/Anchor';
import { RoutePath } from '@/models/RoutePath.enum';

interface Props {
  playlist: SpotifyPlaylist;
  isLoading: boolean;
}

const PlaylistDetails: React.FC<Props> = ({ playlist, isLoading }) => {
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
        src={playlist.images[0].url}
        className="rounded-none"
        priority
      />
      <div className="mt-5 text-center md:text-left md:ml-5">
        <Heading level="h1">{playlist.name}</Heading>
        <Anchor
          href={`${RoutePath.PLAYLIST}/${playlist.id}`}
          className="truncate mr-2"
        >
          {name}
        </Anchor>
      </div>
    </article>
  );
};

export default PlaylistDetails;
