import { ArtistPreviewCardSkeleton } from './components/ArtistPreviewCard';

import SkeletonList from '@/components/SkeletonList';

export default function Loading() {
  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <SkeletonList
        rows={20}
        skeletonComponent={<ArtistPreviewCardSkeleton />}
      />
    </div>
  );
}
