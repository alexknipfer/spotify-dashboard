import PlaylistTracks from '@/components/PlaylistTracks';
import PlaylistDetails from '@/components/PlaylistTracks';
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
  console.log(playlist);

  return (
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
  );
};

export default Playlist;
