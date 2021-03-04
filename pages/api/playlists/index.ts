import { getPlaylists } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

type NextAPIRequestWithPagination = NextApiRequest & {
  query: {
    limit?: string;
    offset?: string;
  };
};

export default async (
  req: NextAPIRequestWithPagination,
  res: NextApiResponse,
) => {
  const session = await getSession({ req });

  const { limit, offset } = req.query;

  const playlistResponse = await getPlaylists(
    session.accessToken,
    limit,
    offset,
  );

  if (isBadStatusCode(playlistResponse)) {
    return res.status(400).json({
      error: 'Failed to fetch playlist.',
    });
  }

  const playlist = await playlistResponse.json();

  return res.status(200).json(playlist);
};
