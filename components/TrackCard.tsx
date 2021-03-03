import { Artist, SpotifyAlbum } from '@/models/Spotify';
import { millisToMinutesAndSeconds } from '@/lib/utils';
import Image from 'next/image';
import Anchor from '@/components/Anchor';
import { RoutePath } from '@/models/RoutePath.enum';

interface Props {
  id?: string;
  name?: string;
  album?: SpotifyAlbum;
  duration?: number;
  artists?: Artist[];
  isLoading?: boolean;
}

const TrackCard: React.FC<Props> = ({
  id,
  name,
  album,
  duration,
  artists = [],
  isLoading,
}) => {
  const artistNames = artists.map((artist) => artist.name).join(', ');

  if (isLoading) {
    return (
      <div className="flex items-center py-4 animate-pulse">
        <div className="h-thumbnail w-thumbnail bg-gray-600 mr-4 flex-shrink-0" />
        <div className="w-full">
          <div className="flex justify-between w-full">
            <div className="h-4 w-40 rounded bg-gray-600 mb-2" />
            <div className="h-3 w-6 rounded bg-gray-600" />
          </div>
          <div className="h-3 w-56 rounded bg-gray-600" />
        </div>
      </div>
    );
  }

  return (
    <article className="flex items-center py-4">
      <div className="flex-shrink-0 h-thumbnail w-thumbnail">
        <Image src={album.images[0].url} width={50} height={50} />
      </div>
      <div className="ml-5 truncate w-full">
        <div className="flex justify-between">
          <Anchor href={`${RoutePath.TRACKS}/${id}`} className="truncate mr-2">
            {name}
          </Anchor>
          <span className="text-gray-400 text-sm">
            {millisToMinutesAndSeconds(duration)}
          </span>
        </div>
        <div className="text-sm text-gray-400 truncate">
          {artistNames}&nbsp;·&nbsp;{album.name}
        </div>
      </div>
    </article>
  );
};

export default TrackCard;
