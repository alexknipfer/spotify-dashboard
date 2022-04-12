import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { getTopTracks } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';

type NextAPIRequestWithRange = NextApiRequest & {
  query: {
    range?: string;
  };
};

export default async (req: NextAPIRequestWithRange, res: NextApiResponse) => {
  const session = await getSession({ req });

  const topTracksResponse = await getTopTracks(
    session.accessToken,
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
