import {
  SpotifyProfile,
  SpotifyPaginatedResponse,
  SpotifyArtist,
  SpotifyTrack,
} from '@/models/Spotify';
import { Fragment } from 'react';
import useSWR from 'swr';
import ArtistCard from '@/components/dashboard/ArtistCard';
import TrackCard from '@/components/dashboard/TrackCard';
import { APIRoute } from '@/models/APIRoute.enum';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SkeletonList from '@/components/SkeletonList';

interface Props {
  isLoading?: boolean;
}

interface TopStatsResponse {
  topTracks: SpotifyPaginatedResponse<SpotifyTrack>;
  topArtists: SpotifyPaginatedResponse<SpotifyArtist>;
}

const Dashboard: React.FC<Props> = () => {
  const { data } = useSWR<SpotifyProfile>(APIRoute.PROFILE);
  const { data: topStats } = useSWR<TopStatsResponse>(APIRoute.TOP_STATS);

  return (
    <Fragment>
      <DashboardHeader isLoading={!data} profile={data} />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-20">
        <ul>
          <h2 className="text-xl font-bold mb-5">Top Artists of All Time</h2>
          {topStats ? (
            topStats?.topArtists?.items?.map((artistDetails) => (
              <li key={artistDetails.id}>
                <ArtistCard
                  id={artistDetails.id}
                  name={artistDetails.name}
                  image={artistDetails.images[0]}
                />
              </li>
            ))
          ) : (
            <SkeletonList skeletonComponent={<ArtistCard isLoading />} />
          )}
        </ul>
        <ul>
          <h2 className="text-xl font-bold mb-5">Top Tracks of All Time</h2>
          {topStats ? (
            topStats?.topTracks?.items?.map((trackDetails) => (
              <li key={trackDetails.id}>
                <TrackCard
                  name={trackDetails.name}
                  duration={trackDetails.duration_ms}
                  artists={trackDetails.artists}
                  album={trackDetails.album}
                />
              </li>
            ))
          ) : (
            <SkeletonList skeletonComponent={<TrackCard isLoading />} />
          )}
        </ul>
      </section>
    </Fragment>
  );
};

export default Dashboard;
