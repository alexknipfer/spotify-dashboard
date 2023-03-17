import { Fragment } from 'react';

import { ArtistDetailsSkeleton } from './components/ArtistDetails';

import { HeadlineStatisticSkeleton } from '@/components/HeadlineStatistic';

export default function Loading() {
  return (
    <Fragment>
      <ArtistDetailsSkeleton />
      <div className="mb-10" />
      <HeadlineStatisticSkeleton />
      <div className="mb-10" />
      <HeadlineStatisticSkeleton />
    </Fragment>
  );
}
