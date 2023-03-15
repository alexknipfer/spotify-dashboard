import { Fragment } from 'react';

import { TrackDetailsSkeleton } from './components/TrackDetails';

import { HeadlineStatisticSkeleton } from '@/components/HeadlineStatistic';
import SkeletonList from '@/components/SkeletonList';

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
