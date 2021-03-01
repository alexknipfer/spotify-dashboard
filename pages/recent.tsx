import { NextPage } from 'next';
import DashboardLayout from '@/layouts/DashboardLayout';
import withAuthentication from '@/hoc/WithAuthentication';
import Heading from '@/components/Heading';
import useSWR from 'swr';
import { APIRoute } from '@/models/APIRoute.enum';
import {
  SpotifyCursorPaginatedResponse,
  SpotifyRecentlyPlayed,
} from '@/models/Spotify';
import SkeletonList from '@/components/SkeletonList';
import TrackCard from '@/components/TrackCard';

const Recent: NextPage = () => {
  const { data: recentlyPlayed } = useSWR<
    SpotifyCursorPaginatedResponse<SpotifyRecentlyPlayed>
  >(APIRoute.RECENTLY_PLAYED);

  return (
    <DashboardLayout>
      <Heading level="h1" className="mb-5">
        Recently Played
      </Heading>
      <ul>
        {recentlyPlayed ? (
          recentlyPlayed.items.map(({ track }, index) => (
            <li key={`${track.id}-${index}`}>
              <TrackCard
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

export default withAuthentication(Recent);
