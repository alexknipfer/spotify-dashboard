import useSWR from 'swr';

import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyArtist } from '@/models/Spotify';

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
