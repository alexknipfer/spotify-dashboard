import { APIRoute } from '@/models/APIRoute.enum';
import { NowPlayingResponse } from 'pages/api/now-playing';
import useSWR from 'swr';
import Image from 'next/image';
import classnames from 'classnames';

import Chevron from '../public/static/icons/chevron.svg';

interface Props {
  isVisible: boolean;
  onToggleVisible: () => void;
}

const NowPlaying: React.FC<Props> = ({ isVisible, onToggleVisible }) => {
  const { data } = useSWR<NowPlayingResponse>(APIRoute.NOW_PLAYING);

  const isPlaying = data && data.isPlaying;

  if (!isPlaying) {
    return null;
  }

  return (
    <div
      className={classnames(
        'fixed bg-spotify-gray border-gray-700 border-t h-24 text-white z-10 shadow-2xl rounded-md transition-bottom duration-200 w-full',
        {
          'bottom-0': isVisible,
          '-bottom-24': !isVisible,
        },
      )}
    >
      <div className="inset-center -top-8 bg-spotify-green rounded-t-md py-1 px-3 shadow-2xl">
        <button
          onClick={onToggleVisible}
          className="flex items-center focus:outline-none text-sm text-white"
        >
          <span className="pr-2">Now Playing</span>
          <Chevron
            className={classnames(
              'fill-current transform transition-transform',
              {
                'rotate-180': isVisible,
                'rotate-0': !isVisible,
              },
            )}
          />
        </button>
      </div>
      <div className="w-full h-full max-w-screen-2xl flex items-center px-5 md:px-16 lg:px-28 mx-auto">
        <Image
          src={data.albumImage}
          width={57}
          height={57}
          className="rounded block"
          alt={`Spotify album cover for ${data.artists}`}
        />
        <div className="pl-4 text-white text-sm md:text-base w-full truncate">
          <a
            href={data.songUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:underline truncate"
          >
            {data.songName}
          </a>
          <div className="text-gray-40 truncate">{data.artists}</div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
