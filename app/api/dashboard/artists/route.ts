import { NextResponse } from 'next/server';

import { isQueryParamValidSpotifyRange } from '@/lib/utils';
import { spotifyService } from '@/lib/spotifyService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rangeQueryParam = searchParams.get('range');
  const range = isQueryParamValidSpotifyRange(rangeQueryParam)
    ? rangeQueryParam
    : undefined;

  const topArtistsResponse = await spotifyService.getTopArtists(50, range);

  return NextResponse.json(topArtistsResponse);
}
