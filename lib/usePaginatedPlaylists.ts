import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyPaginatedResponse, SpotifyPlaylist } from '@/models/Spotify';
import { useMemo } from 'react';
import { useSWRInfinite } from 'swr';

type PaginatedResponse = SpotifyPaginatedResponse<SpotifyPlaylist>;

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

const usePaginatedPlaylists = () => {
  const { data, size, setSize, error } = useSWRInfinite<PaginatedResponse>(
    getKey,
  );

  const playlists = useMemo(
    () => (data ? [].concat(...data.map((result) => result.items)) : []),
    [data],
  );

  const isReachingEnd =
    data && data[data.length - 1]?.items.length < PAGE_LIMIT;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === 'undefined';
  const isEmpty = data?.[0]?.items.length === 0;

  return {
    playlists,
    size,
    setSize,
    isReachingEnd,
    isLoadingMore,
    isEmpty,
    isLoadingInitialData,
  };
};

export default usePaginatedPlaylists;
