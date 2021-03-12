import { NextPage } from 'next';
import DashboardLayout from '@/layouts/DashboardLayout';
import withAuthentication from '@/hoc/WithAuthentication';
import Heading from '@/components/Heading';
import PlayListPreviewCard from '@/components/PlaylistPreviewCard';
import SkeletonList from '@/components/SkeletonList';
import usePaginatedPlaylists from '@/lib/usePaginatedPlaylists';
import Button from '@/components/Button';

const Playlist: NextPage = () => {
  const {
    playlists,
    size,
    setSize,
    isReachingEnd,
    isLoadingInitialData,
    isLoadingMore,
  } = usePaginatedPlaylists();

  return (
    <DashboardLayout>
      <Heading level="h1" className="mb-5">
        Your Playlists
      </Heading>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-16">
        {isLoadingInitialData && (
          <SkeletonList
            rows={20}
            skeletonComponent={<PlayListPreviewCard isLoading />}
          />
        )}
        {playlists.map((playlist, index) => (
          <PlayListPreviewCard key={index} playlist={playlist} />
        ))}
        {isLoadingMore && (
          <SkeletonList
            rows={5}
            skeletonComponent={<PlayListPreviewCard isLoading />}
          />
        )}
      </div>
      {playlists.length === 0 && (
        <div className="flex justify-center items-center">
          <Heading level="h1" className="text-gray-400 text-center">
            Uh oh, you don&apos;t have any playlists yet!
          </Heading>
        </div>
      )}
      {!isReachingEnd && playlists.length > 0 && (
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

export default withAuthentication(Playlist);
