'use client';

import { Fragment } from 'react';
import useSWR from 'swr';

import Heading from '@/components/Heading';
import { RoutePath } from '@/models/RoutePath.enum';
import TimeRangeControls from '@/components/TimeRangeControls';
import {
  SpotifyArtist,
  SpotifyPaginatedResponse,
  SpotifyTimeRange,
} from '@/models/Spotify';
import { isQueryParamValidSpotifyRange } from '@/lib/utils';
import { NewAPIRoute } from '@/models/APIRoute.enum';
import {
  ArtistPreviewCard,
  ArtistPreviewCardSkeleton,
} from '@/components/ArtistPreviewCard';
import SkeletonList from '@/components/SkeletonList';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Artists({ searchParams }: Props) {
  const currentTimeRange = isQueryParamValidSpotifyRange(searchParams.range)
    ? searchParams.range
    : SpotifyTimeRange.LONG_TERM;

  const { data: topArtists } = useSWR<SpotifyPaginatedResponse<SpotifyArtist>>(
    `${NewAPIRoute.ARTISTS}?range=${currentTimeRange}`,
  );

  return (
    <Fragment>
      <div>test</div>
      <div className="flex justify-between items-center flex-col mb-10 md:flex-row">
        <Heading level="h1">Top Artists</Heading>
        <TimeRangeControls route={RoutePath.ARTISTS} className="mt-5 md:mt-0" />
      </div>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {topArtists ? (
          topArtists.items.map((artist) => (
            <ArtistPreviewCard
              key={artist.id}
              name={artist.name}
              href={artist.external_urls.spotify}
              images={artist.images}
            />
          ))
        ) : (
          <SkeletonList
            rows={20}
            skeletonComponent={<ArtistPreviewCardSkeleton />}
          />
        )}
      </div>
    </Fragment>
  );
}
