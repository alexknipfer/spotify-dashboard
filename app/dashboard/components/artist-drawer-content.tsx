import Image from 'next/image';
import { Fragment } from 'react';

import Heading from '@/components/heading';
import { SpotifyArtist } from '@/types/spotify.interface';
import HeadlineStatistic, {
  HeadlineStatisticSkeleton,
} from '@/components/headline-statistic';
import { useArtist } from '@/hooks/use-artist';
import { Badge } from '@/components/ui/badge';
import { titlecase } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props {
  artist: SpotifyArtist;
  isDrawerOpen: boolean;
}

export default function ArtistDrawerContent({ artist, isDrawerOpen }: Props) {
  const { artistDetails } = useArtist(artist.id, isDrawerOpen);

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row items-center">
        <Image
          width={208}
          height={208}
          src={artist.images[0].url}
          className="rounded-full"
          priority
          alt={`Artist image for ${artist.name}`}
        />
        <div className="text-center md:text-left md:ml-5">
          <Heading level="h2">{artist.name}</Heading>
          <div className="flex flex-wrap gap-2 mt-2 mb-5">
            {artist.genres.map((genre) => (
              <Badge variant="secondary" key={genre}>
                {titlecase(genre)}
              </Badge>
            ))}
          </div>
          <Button
            variant="spotify"
            size="spotify"
            hrefExternal={artist.external_urls.spotify}
          >
            Listen on Spotify
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-10">
        {artistDetails ? (
          <HeadlineStatistic
            label="Monthly Listeners"
            value={Number(artistDetails.followers.total).toLocaleString()}
          />
        ) : (
          <HeadlineStatisticSkeleton />
        )}
        <HeadlineStatistic label="Popularity" value={`${artist.popularity}%`} />
      </div>
    </Fragment>
  );
}
