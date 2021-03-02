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
    value: 'long_term',
  },
  {
    label: 'Last 6 Months',
    value: 'medium_term',
  },
  {
    label: 'Last 4 Weeks',
    value: 'short_term',
  },
];

interface Props {
  currentTimeFilter: SpotifyTimeRange;
  onChange: (timeRange: SpotifyTimeRange) => void;
  className?: string;
}

const TimeRangeControls: React.FC<Props> = ({
  onChange,
  currentTimeFilter,
  className,
}) => {
  return (
    <div className={className}>
      {timeRanges.map(({ value, label }) => (
        <Button
          variant="unstyled"
          key={value}
          className="ml-2 md:ml-5"
          onClick={() => onChange(value)}
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
