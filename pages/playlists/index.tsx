import { NextPage } from 'next';
import DashboardLayout from '@/layouts/DashboardLayout';
import withAuthentication from '@/hoc/WithAuthentication';
import Heading from '@/components/Heading';
import PlaylistDetails from '@/components/PlaylistDetails';
import useSWR from 'swr';
import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyPaginatedResponse, SpotifyPlaylist } from '@/models/Spotify';
import SkeletonList from '@/components/SkeletonList';

const Playlist: NextPage = () => {
  const { data: playlists } = useSWR<SpotifyPaginatedResponse<SpotifyPlaylist>>(
    APIRoute.PLAYLISTS,
  );
  return (
    <DashboardLayout>
      <Heading level="h1" className="mb-5">
        Your Playlists
      </Heading>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-16">
        {playlists ? (
          playlists.items.map((playlist, index) => (
            <PlaylistDetails key={index} playlist={playlist} />
          ))
        ) : (
          <SkeletonList
            rows={20}
            skeletonComponent={<PlaylistDetails isLoading />}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuthentication(Playlist);
