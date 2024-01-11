import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { SpotifyTimeRange } from '@/types/spotify.interface';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds;
};

export const isQueryParamValidSpotifyRange = (
  range: (string | string[] | undefined) | (string | null),
): range is SpotifyTimeRange =>
  Object.values(SpotifyTimeRange).includes(
    Array.isArray(range)
      ? (range[0] as SpotifyTimeRange)
      : (range as SpotifyTimeRange),
  );

export const titlecase = (value: string) =>
  value.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
