import { NextPage } from 'next';
import DashboardLayout from '@/layouts/DashboardLayout';
import Heading from '@/components/Heading';
import useSWR from 'swr';
import { APIRoute } from '@/models/APIRoute.enum';
import {
  SpotifyPaginatedResponse,
  SpotifyTimeRange,
  SpotifyTrack,
} from '@/models/Spotify';
import TrackCard from '@/components/TrackCard';
import SkeletonList from '@/components/SkeletonList';
import TimeRangeControls from '@/components/TimeRangeControls';
import { useState } from 'react';

const Tracks: NextPage = () => {
  const [currentTimeRange, setTimeRange] = useState<SpotifyTimeRange>(
    'long_term',
  );
  const { data: topTracks } = useSWR<SpotifyPaginatedResponse<SpotifyTrack>>(
    `${APIRoute.TOP_TRACKS}?range=${currentTimeRange}`,
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center flex-col mb-10 md:flex-row">
        <Heading level="h1">Top Tracks</Heading>
        <TimeRangeControls
          currentTimeFilter={currentTimeRange}
          onChange={setTimeRange}
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
