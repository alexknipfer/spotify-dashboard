import { useMemo, useCallback } from 'react';
import useSWRInfinite from 'swr/infinite';

import { SpotifyPaginatedResponse } from '@/types/spotify.interface';

export interface PaginationConfig {
  url: string;
  paginatedUrl?: string;
  defaultLoadCount?: string;
}

const PAGE_LIMIT = 20;

const usePaginatedData = <PaginatedData>({
  url,
  paginatedUrl,
  defaultLoadCount,
}: PaginationConfig) => {
  const getKey = useCallback(
    (
      pageIndex: number,
      previousPageData: SpotifyPaginatedResponse<PaginatedData>,
    ) => {
      let nextUrl: string | null = '';

      if (previousPageData && !previousPageData.next) {
        nextUrl = null;
      } else if (pageIndex === 0) {
        nextUrl = `${url}?limit=${defaultLoadCount || PAGE_LIMIT}&offset=0`;
      } else {
        const queryParams = new URL(previousPageData.next || url).searchParams;
        const limit = queryParams.get('limit');
        const offset = queryParams.get('offset');

        nextUrl = `${paginatedUrl || url}?limit=${limit}&offset=${offset}`;
      }

      return nextUrl;
    },
    [defaultLoadCount, paginatedUrl, url],
  );

  const {
    data: paginatedData,
    size,
    setSize,
    error,
  } = useSWRInfinite<SpotifyPaginatedResponse<PaginatedData>>(getKey);

  const data: PaginatedData[] = useMemo(
    () =>
      paginatedData ? paginatedData.flatMap((result) => result.items) : [],
    [paginatedData],
  );

  const isReachingEnd =
    paginatedData && paginatedData[paginatedData.length - 1].next === null;
  const isLoadingInitialData = !paginatedData && !error;
  const isLoadingMore =
    size > 0 && paginatedData && typeof paginatedData[size - 1] === 'undefined';
  const isEmpty = paginatedData?.[0]?.items.length === 0;

  return {
    data,
    size,
    setSize,
    isReachingEnd,
    isLoadingMore,
    isEmpty,
    isLoadingInitialData,
  };
};

export default usePaginatedData;
