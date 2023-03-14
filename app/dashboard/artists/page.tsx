import { Fragment } from 'react';

import { ArtistPreviewCard } from './components/ArtistPreviewCard';

import { SpotifyTimeRange } from '@/models/Spotify';
import { isQueryParamValidSpotifyRange } from '@/lib/utils';
import { spotifyService } from '@/lib/spotify';
import Heading from '@/components/Heading';
import TimeRangeControls from '@/components/TimeRangeControls';
import { RoutePath } from '@/models/RoutePath.enum';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 60;

export default async function Artists({ searchParams }: Props) {
  const currentTimeRange = isQueryParamValidSpotifyRange(searchParams.range)
    ? searchParams.range
    : SpotifyTimeRange.LONG_TERM;

  const topArtists = await spotifyService.getTopArtists(50, currentTimeRange);

  return (
    <Fragment>
      <div className="flex justify-between items-center flex-col mb-10 md:flex-row">
        <Heading level="h1">Top Artists</Heading>
        <TimeRangeControls route={RoutePath.ARTISTS} className="mt-5 md:mt-0" />
      </div>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {topArtists.items.map((artist) => (
          <ArtistPreviewCard
            key={artist.id}
            name={artist.name}
            href={artist.external_urls.spotify}
            images={artist.images}
          />
        ))}
      </div>
    </Fragment>
  );
}
