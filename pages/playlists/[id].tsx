import PlaylistTracks from '@/components/PlaylistTracks';
import PlaylistDetails from '@/components/PlaylistDetails';
import DashboardLayout from '@/layouts/DashboardLayout';
import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyPlaylist } from '@/models/Spotify';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SkeletonList from '@/components/SkeletonList';
import useSWR from 'swr';

const Playlist: NextPage = () => {
  const { query } = useRouter();
  const { data: playlist } = useSWR<SpotifyPlaylist>(
    query.id ? `${APIRoute.PLAYLISTS}/${query.id}` : null,
  );

  return (
    <DashboardLayout>
      <PlaylistDetails isLoading={!playlist} playlist={playlist} />
      <div className="mt-10"></div>
      <ul>
        {playlist ? (
          playlist.tracks.items.map(({ track }) => (
            <li key={track.id}>
              <PlaylistTracks
                name={track.name}
                album={track.album}
                artists={track.artists}
                duration={track.duration_ms}
              />
            </li>
          ))
        ) : (
          <SkeletonList skeletonComponent={<PlaylistTracks isLoading />} />
        )}
      </ul>
    </DashboardLayout>
  );
};

export default Playlist;
