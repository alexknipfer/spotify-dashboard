import { Fragment } from 'react';

import { SpotifyTimeRange } from '@/models/Spotify';
import { isQueryParamValidSpotifyRange } from '@/lib/utils';
import { ArtistPreviewCard } from '@/components/ArtistPreviewCard';
import { spotifyService } from '@/lib/spotify';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Artists({ searchParams }: Props) {
  const currentTimeRange = isQueryParamValidSpotifyRange(searchParams.range)
    ? searchParams.range
    : SpotifyTimeRange.LONG_TERM;

  const topArtists = await spotifyService.getTopArtists(50, currentTimeRange);

  return (
    <Fragment>
      {topArtists.items.map((artist) => (
        <ArtistPreviewCard
          key={artist.id}
          name={artist.name}
          href={artist.external_urls.spotify}
          images={artist.images}
        />
      ))}
    </Fragment>
  );
}
