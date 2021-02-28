import { SpotifyImage } from '@/models/Spotify';
import Image from 'next/image';

interface Props {
  id: string;
  name: string;
  image: SpotifyImage;
}

const ArtistCard: React.FC<Props> = ({ name, image }) => {
  return (
    <article className="flex items-center py-4">
      <Image src={image.url} height={50} width={50} className="rounded-full" />
      <div className="text-white text-base ml-5">{name}</div>
    </article>
  );
};

export default ArtistCard;
