import PlaylistTracks from '@/components/PlaylistTracks';
import PlaylistDetails from '@/components/PlaylistDetails';
import DashboardLayout from '@/layouts/DashboardLayout';
import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyPlaylist } from '@/models/Spotify';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SkeletonList from '@/components/SkeletonList';
import useSWR from 'swr';
import { Fragment } from 'react';

const Playlist: NextPage = () => {
  const { query } = useRouter();
  const { data: playlist } = useSWR<SpotifyPlaylist>(
    `${APIRoute.PLAYLISTS}/${query.id}`,
  );

  return (
    <Fragment>
      <DashboardLayout>
        <PlaylistDetails
          isLoading={!playlist}
          playlist={playlist}
        ></PlaylistDetails>
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
    </Fragment>
  );
};

export default Playlist;
