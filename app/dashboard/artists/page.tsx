import { Fragment } from 'react';

import { ArtistPreviewCard } from './components/artist-preview-card';

import { SpotifyTimeRange } from '@/types/spotify.interface';
import { isQueryParamValidSpotifyRange } from '@/lib/utils';
import { spotifyService } from '@/lib/spotify';

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
      {topArtists.items.map((artist, index) => (
        <ArtistPreviewCard
          key={artist.id}
          name={artist.name}
          href={artist.external_urls.spotify}
          images={artist.images}
          index={index}
        />
      ))}
    </Fragment>
  );
}
