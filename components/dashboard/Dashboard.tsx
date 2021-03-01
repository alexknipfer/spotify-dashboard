import {
  SpotifyProfile,
  SpotifyPaginatedResponse,
  SpotifyArtist,
  SpotifyTrack,
} from '@/models/Spotify';
import { Fragment } from 'react';
import useSWR from 'swr';
import ArtistCard from '@/components/ArtistCard';
import TrackCard from '@/components/TrackCard';
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

interface ProfileResponse {
  profile: SpotifyProfile;
  followingCount: number;
  playlistCount: number;
}

const Dashboard: React.FC<Props> = () => {
  const { data } = useSWR<ProfileResponse>(APIRoute.PROFILE);
  const { data: topStats } = useSWR<TopStatsResponse>(APIRoute.TOP_STATS);

  return (
    <Fragment>
      <DashboardHeader
        isLoading={!data}
        profile={data?.profile}
        followingCount={data?.followingCount}
        playlistCount={data?.playlistCount}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-20">
        <section>
          <h2 className="text-xl font-bold mb-5">Top Artists of All Time</h2>
          <ul>
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
        </section>
        <section>
          <h2 className="text-xl font-bold mb-5">Top Tracks of All Time</h2>
          <ul>
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
      </div>
    </Fragment>
  );
};

export default Dashboard;
