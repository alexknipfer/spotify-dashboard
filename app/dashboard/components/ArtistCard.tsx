'use client';

import Image from 'next/image';
import { useState } from 'react';

import ArtistDrawerContent from './ArtistDrawerContent';

import { SpotifyArtist } from '@/models/Spotify';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface Props {
  artist: SpotifyArtist;
}

export default function ArtistCard({ artist }: Props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const image = artist.images[0];

  return (
    <article className="flex items-center py-4">
      <Image
        src={image.url}
        height={50}
        width={50}
        className="rounded-full"
        alt={`Spotify artist image of ${artist.name}`}
      />
      <Drawer
        onOpenChange={(open) => {
          setDrawerOpen(open);
        }}
      >
        <DrawerTrigger asChild>
          <Button variant="link">{artist.name}</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="px-10 py-8">
            <ArtistDrawerContent artist={artist} isDrawerOpen={isDrawerOpen} />
          </div>
        </DrawerContent>
      </Drawer>
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
