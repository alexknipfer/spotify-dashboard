import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyPaginatedResponse, SpotifyPlaylist } from '@/models/Spotify';
import { useMemo } from 'react';
import { useSWRInfinite } from 'swr';

type PaginatedResponse = SpotifyPaginatedResponse<SpotifyPlaylist>;

export interface PaginationConfig {
  url: string;
  paginatedUrl?: string;
  paginatedLimit?: string;
  defaultLoadCount?: string;
}

const PAGE_LIMIT = 20;

const getKey = (pageIndex: number, previousPageData: PaginatedResponse) => {
  if (previousPageData && !previousPageData.next) {
    return null;
  }

  if (pageIndex === 0) {
    return `${APIRoute.PLAYLISTS}?limit=${PAGE_LIMIT}&offset=0`;
  }

  const queryParams = new URL(previousPageData.next).searchParams;
  const limit = queryParams.get('limit');
  const offset = queryParams.get('offset');

  return `${APIRoute.PLAYLISTS}?limit=${limit}&offset=${offset}`;
};

const usePaginatedData = <PaginatedData>({
  url,
  paginatedUrl,
  paginatedLimit,
  defaultLoadCount,
}: PaginationConfig) => {
  const getKey = (
    pageIndex: number,
    previousPageData: SpotifyPaginatedResponse<PaginatedData>,
  ) => {
    if (previousPageData && !previousPageData.next) {
      return null;
    }

    if (pageIndex === 0 && defaultLoadCount) {
      return `${url}?limit=${defaultLoadCount}&offset=0`;
    }
    const queryParams = new URL(previousPageData.next).searchParams;
    const limit = queryParams.get('limit');
    const offset = queryParams.get('offset');

    return `${paginatedUrl || url}?limit=${PAGE_LIMIT}&offset=${offset}`;
  };

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
