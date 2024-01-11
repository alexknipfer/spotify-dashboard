'use client';

import { startTransition } from 'react';
import classnames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import { LayoutGroup, motion } from 'framer-motion';

import Button from '@/components/button';
import { SpotifyTimeRange } from '@/types/spotify.interface';
import { RoutePath } from '@/types/route-path.enum';

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

export default function TimeRangeControl({ route, className }: Props) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentTimeFilter =
    searchParams?.get('range') || SpotifyTimeRange.LONG_TERM;

  const handleTimeRangeChange = (newTimeRange: SpotifyTimeRange) => {
    const params = new URLSearchParams(window.location.search);
    params.set('range', newTimeRange);

    startTransition(() => {
      replace(`${route}?${params.toString()}`);
    });
  };

  return (
    <LayoutGroup>
      <div className={className}>
        {timeRanges.map(({ value, label }) => (
          <Button
            variant="unstyled"
            key={value}
            className="ml-2 md:ml-5"
            onClick={() => handleTimeRangeChange(value)}
            aria-pressed={value === currentTimeFilter}
          >
            <span
              className={classnames(
                'relative hover:text-white transition duration-200 text-xs md:text-sm pb-1',
                {
                  'text-gray-400': value !== currentTimeFilter,
                },
              )}
            >
              <span>{label}</span>
              {value === currentTimeFilter ? (
                <motion.div
                  className="absolute inset-0 border-b-2 border-white text-white"
                  layoutId="timerange"
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              ) : null}
            </span>
          </Button>
        ))}
      </div>
    </LayoutGroup>
  );
}
