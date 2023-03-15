'use client';

import Image from 'next/image';

import { SpotifyPlaylist } from '@/models/Spotify';
import Anchor from '@/components/Anchor';
import { RoutePath } from '@/models/RoutePath.enum';

interface Props {
  playlist: SpotifyPlaylist;
}

export default function PlaylistPreviewCard({ playlist }: Props) {
  return (
    <div className="text-center">
      {playlist.images.length > 0 && (
        <Image
          src={playlist.images[0]?.url}
          width={208}
          height={208}
          alt={`Image for playlist ${playlist.name}`}
          className="inline-block mb-2"
        />
      )}
      <Anchor
        href={`${RoutePath.PLAYLIST}/${playlist.id}`}
        className="block truncate"
      >
        {playlist.name}
      </Anchor>
      <div className="text-gray-500 text-xs">
        {playlist.tracks.total} TRACKS
      </div>
    </div>
  );
}

export function PlaylistPreviewCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-[208px] h-[208px] bg-gray-600 mb-2" />
      <div className="h-4 w-8/12 bg-gray-600 mt-2" />
    </div>
  );
}
