import Image from 'next/image';

import ProfileIcon from '../public/static/icons/profile_icon.svg';

import Anchor from '@/components/Anchor';
import { SpotifyImage } from '@/models/Spotify';

interface Props {
  name: string;
  images: SpotifyImage[];
  href: string;
}

export function ArtistPreviewCard({ name, images, href }: Props) {
  return (
    <div className="text-center">
      {images?.length ? (
        <Image
          src={images[0].url}
          width={208}
          height={208}
          className="rounded-full"
          alt=""
        />
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
      <div className="w-full rounded-full bg-gray-600 circle" />
      <div className="h-4 w-8/12 bg-gray-600 mt-2" />
      <style jsx>{`
        .circle::before {
          content: '';
          display: block;
          padding-bottom: 100%;
        }
      `}</style>
    </div>
  );
}
