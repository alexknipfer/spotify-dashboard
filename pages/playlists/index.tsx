import { NextPage } from 'next';
import DashboardLayout from '@/layouts/DashboardLayout';
import withAuthentication from '@/hoc/WithAuthentication';
import Heading from '@/components/Heading';
import PlaylistDetails from '@/components/PlaylistDetails';
import useSWR from 'swr';
import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyPaginatedResponse, SpotifyPlaylist } from '@/models/Spotify';

const Playlist: NextPage = () => {
  const { data: playlists } = useSWR<SpotifyPaginatedResponse<SpotifyPlaylist>>(
    APIRoute.PLAYLISTS,
  );

  return (
    <DashboardLayout>
      <Heading level="h1" className="mb-5">
        Recently Played
      </Heading>
      <PlaylistDetails />
      {/* <ul>
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
      </ul> */}
    </DashboardLayout>
  );
};

export default withAuthentication(Playlist);
