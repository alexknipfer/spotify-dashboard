import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from 'pages/api/auth/[...nextauth]';

import { getTopTracks } from '@/lib/spotify';
import { isQueryParamValidSpotifyRange } from '@/lib/utils';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const rangeQueryParam = searchParams.get('range');
  const range = isQueryParamValidSpotifyRange(rangeQueryParam)
    ? rangeQueryParam
    : undefined;

  const topTracksResponse = await getTopTracks(session.accessToken, 50, range);

  //   if (isBadStatusCode(topTracksResponse)) {
  //     return res.status(400).json({
  //       error: 'Failed to fetch top tracks.',
  //     });
  //   }

  //   const topTracks = await topTracksResponse.json();

  //   return res.status(200).json(topTracks);

  return NextResponse.json(topTracksResponse);
}
