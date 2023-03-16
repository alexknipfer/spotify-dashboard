'use client';

import Heading from '@/components/Heading';

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Heading level="h1">Something went wrong!</Heading>
      <div>{error.message}</div>
    </div>
  );
}
