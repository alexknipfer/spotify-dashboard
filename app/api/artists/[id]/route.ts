import { NextResponse } from 'next/server';

import { spotifyService } from '@/lib/spotify';

interface Params {
  id: string;
}

export async function GET(_request: Request, { params }: { params: Params }) {
  const artist = await spotifyService.getArtistById(params.id);

  return NextResponse.json(artist, { status: 200 });
}
