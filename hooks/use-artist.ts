import useSWR from 'swr';

import { APIRoute } from '@/types/api-route.enum';
import { SpotifyArtist } from '@/types/spotify.interface';

export function useArtist(artistId: string, shouldFetch = true) {
  const { data, isLoading, error } = useSWR<SpotifyArtist>(
    shouldFetch ? `${APIRoute.ARTISTS}/${artistId}` : null,
  );

  return {
    artistDetails: data,
    isLoading,
    error,
  };
}
