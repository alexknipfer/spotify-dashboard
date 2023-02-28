'use client';

import classnames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';

import Button from '@/components/Button';
import { SpotifyTimeRange } from '@/models/Spotify';
import { RoutePath } from '@/models/RoutePath.enum';

interface TimeRange {
  label: string;
  value: SpotifyTimeRange;
}

const timeRanges: TimeRange[] = [
  {
    label: 'All Time',
    value: SpotifyTimeRange.LONG_TERM,
  },
  {
    label: 'Last 6 Months',
    value: SpotifyTimeRange.MEDIUM_TERM,
  },
  {
    label: 'Last 4 Weeks',
    value: SpotifyTimeRange.SHORT_TERM,
  },
];

interface Props {
  route: RoutePath;
  className?: string;
}

const TimeRangeControls = ({ route, className }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTimeFilter =
    searchParams?.get('range') || SpotifyTimeRange.LONG_TERM;

  return (
    <div className={className}>
      {timeRanges.map(({ value, label }) => (
        <Button
          variant="unstyled"
          key={value}
          className="ml-2 md:ml-5"
          onClick={() => router.push(`${route}?range=${value}`)}
          aria-pressed={value === currentTimeFilter}
        >
          <span
            className={classnames(
              ' hover:text-white transition duration-200 text-xs md:text-sm pb-1',
              {
                'border-b-2 border-white text-white':
                  value === currentTimeFilter,
                'text-gray-400': value !== currentTimeFilter,
              },
            )}
          >
            {label}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default TimeRangeControls;
