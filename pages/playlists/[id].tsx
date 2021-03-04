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
import Image from 'next/image';

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

        <ul>
          {playlist ? (
            playlist.tracks.items.map(({ track }) => (
              <li key={track.id}>
                <PlaylistTracks
                  id={track.id}
                  name={track.name}
                  album={track.album}
                  artists={track.artists}
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
