import Image from 'next/image';

import ArtistDrawerContent from './ArtistDrawerContent';

import { SpotifyArtist } from '@/models/Spotify';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { titlecase } from '@/lib/utils';

interface Props {
  artist: SpotifyArtist;
}

export default function ArtistCard({ artist }: Props) {
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
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="link">{artist.name}</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-full px-6">
            <DrawerHeader>
              <DrawerTitle>{artist.name}</DrawerTitle>
              <DrawerDescription className="flex space-x-2 flex-wrap mt-2">
                {artist.genres.map((genre) => (
                  <Badge variant="secondary" key={genre}>
                    {titlecase(genre)}
                  </Badge>
                ))}
              </DrawerDescription>
            </DrawerHeader>
            <ArtistDrawerContent artist={artist} />
          </div>
        </DrawerContent>
      </Drawer>
      {/* <Anchor href={`${RoutePath.ARTIST}/${id}`} className="ml-5">
        {name}
      </Anchor> */}
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
