import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import TrackCard from '@/components/TrackCard';
import PlaylistDetails from '@/components/PlaylistDetails';
import DashboardLayout from '@/layouts/DashboardLayout';
import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyPlaylist, PlaylistTrack } from '@/models/Spotify';
import SkeletonList from '@/components/SkeletonList';
import usePaginatedData from '@/lib/usePaginatedData';
import Button from '@/components/Button';

const Playlist: NextPage = () => {
  const { query } = useRouter();
  const {
    data,
    size,
    setSize,
    isReachingEnd,
    isLoadingInitialData,
    isLoadingMore,
  } = usePaginatedData<PlaylistTrack>({
    url: query.id ? `${APIRoute.PLAYLISTS}/${query.id}/tracks` : null,
    defaultLoadCount: '100',
  });

  const { data: playlist } = useSWR<SpotifyPlaylist>(
    query.id ? `${APIRoute.PLAYLISTS}/${query.id}` : null,
  );

  return (
    <DashboardLayout>
      <PlaylistDetails isLoading={!playlist} playlist={playlist} />
      <div className="mt-10"></div>
      {isLoadingInitialData && (
        <SkeletonList rows={20} skeletonComponent={<TrackCard isLoading />} />
      )}

      {data.map((track, index) => (
        <ul key={index}>
          <li>
            <TrackCard
              id={track.track.id}
              name={track.track.name}
              album={track.track.album}
              duration={track.track.duration_ms}
              artists={track.track.artists}
            />
          </li>
        </ul>
      ))}

      {isLoadingMore && (
        <SkeletonList rows={5} skeletonComponent={<TrackCard isLoading />} />
      )}
      {!isReachingEnd && (
        <div className="text-center">
          <Button
            variant="outline"
            buttonSize="small"
            onClick={() => setSize(size + 1)}
          >
            Load More
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Playlist;
