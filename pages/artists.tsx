import { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
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

const Artists: NextPage = () => {
  const [currentTimeRange, setTimeRange] = useState<SpotifyTimeRange>(
    'long_term',
  );
  const { data: topArtists } = useSWR<SpotifyPaginatedResponse<SpotifyArtist>>(
    `${APIRoute.TOP_ARTISTS}?range=${currentTimeRange}`,
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center flex-col mb-10 md:flex-row">
        <Heading level="h1">Top Artists</Heading>
        <TimeRangeControls
          currentTimeFilter={currentTimeRange}
          onChange={setTimeRange}
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
              imageSrc={artist.images[0].url}
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
