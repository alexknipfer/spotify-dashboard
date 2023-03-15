import { NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import TimeRangeControls from '@/components/TimeRangeControls';
import DashboardLayout from '@/layouts/DashboardLayout';
import Heading from '@/components/Heading';
import { APIRoute } from '@/models/APIRoute.enum';
import {
  SpotifyPaginatedResponse,
  SpotifyTimeRange,
  SpotifyTrack,
} from '@/models/Spotify';
import TrackCard from '@/components/TrackCard';
import SkeletonList from '@/components/SkeletonList';
import { RoutePath } from '@/models/RoutePath.enum';
import { isQueryParamValidSpotifyRange } from '@/lib/utils';

const Tracks: NextPage = () => {
  const router = useRouter();

  const currentTimeRange = isQueryParamValidSpotifyRange(router.query.range)
    ? router.query.range
    : SpotifyTimeRange.LONG_TERM;

  const { data: topTracks } = useSWR<SpotifyPaginatedResponse<SpotifyTrack>>(
    `${APIRoute.TOP_TRACKS}?range=${currentTimeRange}`,
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center flex-col mb-10 md:flex-row">
        <Heading level="h1">Top Tracks</Heading>
        <TimeRangeControls
          currentTimeFilter={currentTimeRange}
          onChange={(range) =>
            router.push({ pathname: RoutePath.TRACKS, query: { range } })
          }
          className="mt-5 md:mt-0"
        />
      </div>
      <ul>
        {topTracks ? (
          topTracks.items.map((track) => (
            <li key={track.id}>
              <TrackCard
                id={track.id}
                name={track.name}
                album={track.album}
                duration={track.duration_ms}
                artists={track.artists}
              />
            </li>
          ))
        ) : (
          <SkeletonList skeletonComponent={<TrackCard isLoading />} />
        )}
      </ul>
    </DashboardLayout>
  );
};

export default Tracks;
