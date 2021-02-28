import { Artist, SpotifyAlbum } from '@/models/Spotify';
import { millisToMinutesAndSeconds } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  name: string;
  album: SpotifyAlbum;
  duration: number;
  artists: Artist[];
}

const TrackCard: React.FC<Props> = ({ name, album, duration, artists }) => {
  const artistNames = artists.map((artist) => artist.name).join(', ');

  return (
    <article className="flex items-center py-4">
      <Image src={album.images[0].url} width={50} height={50} layout="fixed" />
      <div className="ml-5 truncate w-9/12">
        <div className="flex justify-between">
          <div className="text-base text-white truncate mr-2">{name}</div>
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
