import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { getTopArtists } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';

type NextAPIRequestWithRange = NextApiRequest & {
  query: {
    range?: string;
  };
};

export default async (req: NextAPIRequestWithRange, res: NextApiResponse) => {
  const session = await getSession({ req });

  const topArtistsResponse = await getTopArtists(
    session.accessToken,
    50,
    req.query.range,
  );

  if (isBadStatusCode(topArtistsResponse)) {
    return res.status(400).json({
      error: 'Failed to fetch top tracks.',
    });
  }

  const topArtists = await topArtistsResponse.json();

  return res.status(200).json(topArtists);
};
