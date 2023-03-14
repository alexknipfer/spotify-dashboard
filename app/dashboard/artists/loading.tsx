import { ArtistPreviewCardSkeleton } from 'app/dashboard/artists/components/ArtistPreviewCard';
import SkeletonList from '@/components/SkeletonList';

export default function Loading() {
  return (
    <SkeletonList rows={20} skeletonComponent={<ArtistPreviewCardSkeleton />} />
  );
}
