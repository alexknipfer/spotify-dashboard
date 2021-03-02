import { getTopTracksOrArtists } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

type NextAPIRequestWithRange = NextApiRequest & {
  query: {
    range?: string;
  };
};

export default async (req: NextAPIRequestWithRange, res: NextApiResponse) => {
  const session = await getSession({ req });

  const topTracksResponse = await getTopTracksOrArtists(
    session.accessToken,
    'tracks',
    50,
    req.query.range,
  );

  if (isBadStatusCode(topTracksResponse)) {
    return res.status(400).json({
      error: 'Failed to fetch top tracks.',
    });
  }

  const topTracks = await topTracksResponse.json();

  return res.status(200).json(topTracks);
};
