import Image from 'next/image';

import { PlaylistTrack } from '@/models/Spotify';
import { millisToMinutesAndSeconds } from '@/lib/utils';

interface Props {
  track?: PlaylistTrack;
  isLoading?: boolean;
}

const PlaylistTracks: React.FC<Props> = ({ track, isLoading }) => {
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
        <Image src={track.track.album.images[0].url} width={50} height={50} />
      </div>
      <div className="ml-5 truncate w-full">
        <div className="flex justify-between">
          <div className="truncate mr-2">{track.track.name}</div>
          <span className="text-gray-400 text-sm">
            {millisToMinutesAndSeconds(track.track.duration_ms)}
          </span>
        </div>
        <div className="text-sm text-gray-400 truncate">
          {track.track.artists[0].name}&nbsp;·&nbsp;{track.track.album.name}
        </div>
      </div>
    </article>
  );
};

export default PlaylistTracks;
