import Image from 'next/image';

import ProfileIcon from '../../../../public/static/icons/profile_icon.svg';

import Anchor from '@/components/Anchor';
import { SpotifyImage } from '@/models/Spotify';

interface Props {
  name: string;
  images: SpotifyImage[];
  href: string;
}

export function ArtistPreviewCard({ name, images, href }: Props) {
  return (
    <div className="flex flex-col items-center">
      {images?.length ? (
        <div className="relative w-40 h-40 md:h-[208px] md:w-[208px]">
          <Image
            src={images[0].url}
            className="rounded-full object-cover"
            alt={`Image of ${name}`}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center border border-white rounded-full p-7 w-52 h-52">
          <ProfileIcon fill="#fff" width="100%" height="100%" />
        </div>
      )}
      {href && (
        <Anchor isExternal href={href} className="block mt-2">
          {name || ''}
        </Anchor>
      )}
    </div>
  );
}

export function ArtistPreviewCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col items-center">
      <div className="rounded-full h-40 w-40 md:h-[208px] md:w-[208px] bg-gray-600" />
      <div className="h-4 w-8/12 bg-gray-600 mt-2" />
    </div>
  );
}
