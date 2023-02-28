'use client';
import classnames from 'classnames';

import Button from '@/components/Button';
import { SpotifyTimeRange } from '@/models/Spotify';

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
  currentTimeFilter: SpotifyTimeRange;
  onChange: (timeRange: SpotifyTimeRange) => void;
  className?: string;
}

const TimeRangeControls = ({
  onChange,
  currentTimeFilter,
  className,
}: Props) => {
  return (
    <div className={className}>
      {timeRanges.map(({ value, label }) => (
        <Button
          variant="unstyled"
          key={value}
          className="ml-2 md:ml-5"
          onClick={() => onChange(value)}
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
