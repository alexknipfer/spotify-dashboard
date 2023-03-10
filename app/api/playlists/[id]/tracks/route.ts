import { NextResponse } from 'next/server';

import { spotifyService } from '@/lib/spotify';

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  const tracks = await spotifyService.getPlaylistTracks(
    params.id,
    limit,
    offset,
  );

  return NextResponse.json(tracks, { status: 200 });
}
