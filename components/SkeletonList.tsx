import { Fragment } from 'react';

interface Props {
  skeletonComponent: React.ReactNode;
  rows?: number;
}

const DEFAULT_ROWS = 15;

const SkeletonList = ({ rows = DEFAULT_ROWS, skeletonComponent }: Props) => {
  return (
    <Fragment>
      {Array(rows)
        .fill(0)
        .map((_, index) => (
          <Fragment key={index}>{skeletonComponent}</Fragment>
        ))}
    </Fragment>
  );
};

export default SkeletonList;
