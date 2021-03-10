import { SpotifyPaginatedResponse } from '@/models/Spotify';
import { useMemo, useCallback } from 'react';
import { useSWRInfinite } from 'swr';

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
      if (previousPageData && !previousPageData.next) {
        return null;
      }
      if (pageIndex === 0 && defaultLoadCount) {
        return `${url}?limit=${defaultLoadCount}&offset=0`;
      }
      if (pageIndex === 0) {
        return `${url}?limit=${PAGE_LIMIT}&offset=0`;
      }
      const queryParams = new URL(previousPageData.next).searchParams;
      const limit = queryParams.get('limit');
      const offset = queryParams.get('offset');

      return `${paginatedUrl || url}?limit=${limit}&offset=${offset}`;
    },
    [defaultLoadCount, paginatedUrl, url],
  );

  const { data: paginatedData, size, setSize, error } = useSWRInfinite<
    SpotifyPaginatedResponse<PaginatedData>
  >(getKey);

  const data: PaginatedData[] = useMemo(
    () =>
      paginatedData
        ? [].concat(...paginatedData.map((result) => result.items))
        : [],
    [paginatedData],
  );

  const isReachingEnd =
    paginatedData &&
    paginatedData[paginatedData.length - 1]?.items.length < PAGE_LIMIT;
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
