import { ArtistPreviewCardSkeleton } from './components/artist-preview-card';

import SkeletonList from '@/components/skeleton-list';

export default function Loading() {
  return (
    <SkeletonList rows={20} skeletonComponent={<ArtistPreviewCardSkeleton />} />
  );
}
