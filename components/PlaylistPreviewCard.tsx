import { SpotifyPlaylist } from '@/models/Spotify';
import Image from 'next/image';
import Anchor from '@/components/Anchor';
import { RoutePath } from '@/models/RoutePath.enum';

interface Props {
  playlist?: SpotifyPlaylist;
  isLoading?: boolean;
}

const PlaylistPreviewCard: React.FC<Props> = ({ playlist, isLoading }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-full bg-gray-600 square" />
        <div className="h-4 w-8/12 bg-gray-600 mt-2" />
        <style jsx>{`
          .square::before {
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
        <Image src={playlist.images[0]?.url} width={208} height={208} />
      )}

      <Anchor
        href={`${RoutePath.PLAYLIST}/${playlist.id}`}
        className="truncate"
      >
        {playlist.name}
      </Anchor>
      <div className="text-gray-500 text-xs">
        {playlist.tracks.total} TRACKS
      </div>
    </div>
  );
};

export default PlaylistPreviewCard;
