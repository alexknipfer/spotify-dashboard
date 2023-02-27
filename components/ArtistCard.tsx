import Image from 'next/image';

import { RoutePath } from '@/models/RoutePath.enum';
import { SpotifyImage } from '@/models/Spotify';
import Anchor from '@/components/Anchor';

interface Props {
  id: string;
  name: string;
  image: SpotifyImage;
}

export default function ArtistCard({ name, image, id }: Props) {
  return (
    <article className="flex items-center py-4">
      <Image
        src={image.url}
        height={50}
        width={50}
        className="rounded-full"
        alt={`Spotify artist image of ${name}`}
      />
      <Anchor href={`${RoutePath.ARTIST}/${id}`} className="ml-5">
        {name}
      </Anchor>
    </article>
  );
}

export function ArtistCardSkeleton() {
  return (
    <div className="flex items-center py-4 animate-pulse">
      <div className="h-14 w-14 rounded-full bg-gray-600 mr-4" />
      <div className="h-4 w-40 rounded bg-gray-600" />
    </div>
  );
}
