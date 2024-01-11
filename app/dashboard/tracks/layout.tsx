import { Fragment } from 'react';

import Heading from '@/components/heading';
import TimeRangeControl from '@/components/time-range-control';
import { RoutePath } from '@/types/route-path.enum';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Fragment>
      <div className="flex justify-between items-center flex-col mb-10 md:flex-row">
        <Heading level="h1">Top Tracks</Heading>
        <TimeRangeControl route={RoutePath.TRACKS} className="mt-5 md:mt-0" />
      </div>
      {children}
    </Fragment>
  );
}
