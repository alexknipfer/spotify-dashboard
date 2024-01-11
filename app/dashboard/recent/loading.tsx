import SkeletonList from '@/components/skeleton-list';
import { TrackCardSkeleton } from '@/components/track-card';

export default function Loading() {
  return <SkeletonList skeletonComponent={<TrackCardSkeleton />} />;
}
