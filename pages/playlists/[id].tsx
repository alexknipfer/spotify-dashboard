import PlaylistTracks from '@/components/PlaylistTracks';
import PlaylistDetails from '@/components/PlaylistDetails';
import DashboardLayout from '@/layouts/DashboardLayout';
import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyPlaylist, PlaylistTrack } from '@/models/Spotify';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SkeletonList from '@/components/SkeletonList';
import useSWR from 'swr';
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
    url: `${APIRoute.PLAYLISTS}/${query.id}/tracks`,
    defaultLoadCount: '100',
  });

  const { data: playlist } = useSWR<SpotifyPlaylist>(
    `${APIRoute.PLAYLISTS}/${query.id}`,
  );

  return (
    <DashboardLayout>
      <PlaylistDetails isLoading={!playlist} playlist={playlist} />
      <div className="mt-10"></div>
      {isLoadingInitialData && (
        <SkeletonList
          rows={20}
          skeletonComponent={<PlaylistTracks isLoading />}
        />
      )}

      {data.map((track, index) => (
        <PlaylistTracks key={index} track={track} />
      ))}
      {isLoadingMore && (
        <SkeletonList
          rows={5}
          skeletonComponent={<PlaylistTracks isLoading />}
        />
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
