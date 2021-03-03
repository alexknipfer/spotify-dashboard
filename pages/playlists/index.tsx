import { NextPage } from 'next';
import DashboardLayout from '@/layouts/DashboardLayout';
import withAuthentication from '@/hoc/WithAuthentication';
import Heading from '@/components/Heading';
import PlaylistDetails from '@/components/PlaylistDetails';
import useSWR from 'swr';
import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyPaginatedResponse, SpotifyPlaylist } from '@/models/Spotify';
import SkeletonList from '@/components/SkeletonList';
import { Fragment } from 'react';

const Playlist: NextPage = () => {
  const { data: playlists } = useSWR<SpotifyPaginatedResponse<SpotifyPlaylist>>(
    APIRoute.PLAYLISTS,
  );

  console.log(playlists);
  return (
    <DashboardLayout>
      <Heading level="h1" className="mb-5">
        Recently Played
      </Heading>
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
