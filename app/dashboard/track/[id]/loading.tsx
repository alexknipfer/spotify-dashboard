import { Fragment } from 'react';

import { TrackDetailsSkeleton } from './components/TrackDetails';

import { HeadlineStatisticSkeleton } from '@/components/headline-statistic';
import SkeletonList from '@/components/skeleton-list';

export default function Loading() {
  return (
    <Fragment>
      <TrackDetailsSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10">
        <SkeletonList
          rows={4}
          skeletonComponent={<HeadlineStatisticSkeleton />}
        />
      </div>
    </Fragment>
  );
}
