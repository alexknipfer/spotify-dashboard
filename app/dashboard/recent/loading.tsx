import SkeletonList from '@/components/SkeletonList';
import { TrackCardSkeleton } from '@/components/TrackCard';

export default function Loading() {
  return <SkeletonList skeletonComponent={<TrackCardSkeleton />} />;
}
