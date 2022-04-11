import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { getPlaylistById } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';

type NextAPIRequestWithId = NextApiRequest & {
  query: {
    id: string;
  };
};

export default async (req: NextAPIRequestWithId, res: NextApiResponse) => {
  const session = await getSession({ req });

  const { id } = req.query;

  const playlistResponse = await getPlaylistById(session.accessToken, id);

  if (isBadStatusCode(playlistResponse)) {
    return res.status(400).json({
      error: 'Failed to fetch playlist.',
    });
  }

  const playlist = await playlistResponse.json();

  return res.status(200).json(playlist);
};
