import Image from 'next/image';

import { RoutePath } from '@/models/RoutePath.enum';
import { SpotifyImage } from '@/models/Spotify';
import Anchor from '@/components/Anchor';

interface Props {
  id?: string;
  name?: string;
  image?: SpotifyImage;
  isLoading?: boolean;
}

const ArtistCard: React.FC<Props> = ({ name, image, isLoading, id }) => {
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
      <Anchor href={`${RoutePath.ARTIST}/${id}`} className="ml-5">
        {name}
      </Anchor>
    </article>
  );
};

export default ArtistCard;
