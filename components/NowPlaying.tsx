import { APIRoute } from '@/models/APIRoute.enum';
import { NowPlayingResponse } from 'pages/api/now-playing';
import useSWR from 'swr';
import Image from 'next/image';
import classnames from 'classnames';
import { useState } from 'react';

import Chevron from '../public/static/icons/chevron.svg';
import SpotifyIcon from '../public/static/icons/spotify_icon.svg';

const NowPlaying: React.FC = () => {
  const { data } = useSWR<NowPlayingResponse>(APIRoute.NOW_PLAYING);
  const [isVisible, setVisible] = useState(false);

  const isPlaying = data && data.isPlaying;

  if (!isPlaying) {
    return null;
  }

  return (
    <article className="fixed z-10 bottom-5 right-5 md:bottom-10 md:right-10">
      <div
        className={classnames(
          'absolute right-0 bottom-20 py-6 px-10 bg-spotify-gray border border-gray-700 w-72 rounded-md transition-opacity',
          {
            'opacity-0 invisible': !isVisible,
            'opacity-100 visible': isVisible,
          },
        )}
      >
        <div className="text-gray-400 text-lg mb-5">Now Playing:</div>
        <Image
          src={data.albumImage.url}
          width={data.albumImage.width}
          height={data.albumImage.height}
        />
        <div className="text-white text-sm md:text-base w-full truncate mt-5">
          <a
            href={data.songUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:underline truncate"
          >
            {data.songName}
          </a>
          <div className="text-gray-400 truncate">{data.artists}</div>
        </div>
      </div>
      <button
        className="p-4 flex justify-center items-center w-16 h-16 bg-spotify-green rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-spotify-light-green text-white"
        onClick={() => setVisible((prev) => !prev)}
      >
        {!isVisible && <SpotifyIcon />}
        {isVisible && <Chevron className="transform rotate-180 fill-current" />}
      </button>
    </article>
  );
};

export default NowPlaying;
