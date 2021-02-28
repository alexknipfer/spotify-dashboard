import { SpotifyImage } from '@/models/Spotify';
import Image from 'next/image';

interface Props {
  id?: string;
  name?: string;
  image?: SpotifyImage;
  isLoading?: boolean;
}

const ArtistCard: React.FC<Props> = ({ name, image, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center py-4 animate-pulse">
        <div className="h-14 w-14 rounded-full bg-gray-600 mr-4" />
        <div className="h-4 w-40 rounded bg-gray-600" />
      </div>
    );
  }

  return (
    <article className="flex items-center py-4">
      <Image src={image.url} height={50} width={50} className="rounded-full" />
      <div className="text-white text-base ml-5">{name}</div>
    </article>
  );
};

export default ArtistCard;
