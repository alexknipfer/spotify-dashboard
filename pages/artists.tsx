import { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import withAuthentication from '@/hoc/WithAuthentication';
import DashboardLayout from '@/layouts/DashboardLayout';
import Heading from '@/components/Heading';
import TimeRangeControls from '@/components/TimeRangeControls';
import {
  SpotifyArtist,
  SpotifyPaginatedResponse,
  SpotifyTimeRange,
} from '@/models/Spotify';
import { APIRoute } from '@/models/APIRoute.enum';
import ArtistPreviewCard from '@/components/ArtistPreviewCard';
import SkeletonList from '@/components/SkeletonList';
import { RoutePath } from '@/models/RoutePath.enum';
import { isQueryParamValidSpotifyRange } from '@/lib/utils';

const Artists: NextPage = () => {
  const router = useRouter();

  const currentTimeRange = isQueryParamValidSpotifyRange(router.query.range)
    ? router.query.range
    : SpotifyTimeRange.LONG_TERM;

  const { data: topArtists } = useSWR<SpotifyPaginatedResponse<SpotifyArtist>>(
    `${APIRoute.TOP_ARTISTS}?range=${currentTimeRange}`,
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center flex-col mb-10 md:flex-row">
        <Heading level="h1">Top Artists</Heading>
        <TimeRangeControls
          currentTimeFilter={currentTimeRange}
          onChange={(range) =>
            router.push({ pathname: RoutePath.ARTISTS, query: { range } })
          }
          className="mt-5 md:mt-0"
        />
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
            skeletonComponent={<ArtistPreviewCard isLoading />}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuthentication(Artists);
