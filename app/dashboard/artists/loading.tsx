import { ArtistPreviewCardSkeleton } from './components/ArtistPreviewCard';

import SkeletonList from '@/components/skeleton-list';

export default function Loading() {
  return (
    <SkeletonList rows={20} skeletonComponent={<ArtistPreviewCardSkeleton />} />
  );
}
