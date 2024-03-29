import { Fragment } from 'react';

import { ArtistDetailsSkeleton } from './components/artist-details';

import { HeadlineStatisticSkeleton } from '@/components/headline-statistic';

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
