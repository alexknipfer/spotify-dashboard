import { SpotifyTrack } from '@/models/Spotify';
import Image from 'next/image';
import Heading from '@/components/Heading';
import Button from '@/components/Button';

interface Props {
  track: SpotifyTrack;
  isLoading: boolean;
}

const TrackDetails: React.FC<Props> = ({ track, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row items-center animate-pulse">
        <div className="w-52 h-52 bg-gray-400 mb-5 md:mr-5" />
        <div className="flex flex-col items-center md:items-start">
          <div className="w-56 bg-gray-400 h-7 mb-2" />
          <div className="w-40 bg-gray-400 h-5 mb-2" />
          <div className="w-40 bg-gray-400 h-4" />
        </div>
      </div>
    );
  }

  return (
    <article className="flex flex-col md:flex-row items-center">
      <Image
        width={208}
        height={208}
        src={track.album.images[0].url}
        priority
      />
      <div className="text-center md:text-left md:ml-5">
        <Heading level="h1">{track.name}</Heading>
        <h2 className="text-gray-400 text-xl mt-2">
          {track.artists.map((artist) => artist.name).join(', ')}
        </h2>
        <h3 className="text-gray-400 text-base mb-5">
          {track.album.name} -{' '}
          {new Date(track.album.release_date).getFullYear()}
        </h3>
        <Button
          variant="primary"
          buttonSize="small"
          hrefExternal={track.external_urls.spotify}
        >
          Listen on Spotify
        </Button>
      </div>
    </article>
  );
};

export default TrackDetails;
