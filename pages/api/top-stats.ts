import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { getTopArtists, getTopTracks } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  const [topArtistsResponse, topTracksResponse] = await Promise.all([
    getTopArtists(session.accessToken, 10),
    getTopTracks(session.accessToken, 10),
  ]);

  if (
    isBadStatusCode(topArtistsResponse) ||
    isBadStatusCode(topTracksResponse)
  ) {
    return res.status(400).json({
      error: 'Failed to fetch top tracks and artists.',
    });
  }

  const [topTracks, topArtists] = await Promise.all([
    topTracksResponse.json(),
    topArtistsResponse.json(),
  ]);

  return res.status(200).json({
    topTracks,
    topArtists,
  });
};
