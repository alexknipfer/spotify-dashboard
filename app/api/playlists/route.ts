import { NextResponse } from 'next/server';

import { spotifyService } from '@/lib/spotifyService';

export async function GET(request: Request) {
  console.log('hello');
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  const playlists = await spotifyService.getPlaylists(limit, offset);

  return NextResponse.json(playlists, { status: 200 });
}
