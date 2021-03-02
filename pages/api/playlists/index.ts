import { getPlaylists } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

type NextAPIRequestWithId = NextApiRequest;

export default async (req: NextAPIRequestWithId, res: NextApiResponse) => {
  const session = await getSession({ req });

  const playlistResponse = await getPlaylists(session.accessToken);

  if (isBadStatusCode(playlistResponse)) {
    return res.status(400).json({
      error: 'Failed to fetch playlist.',
    });
  }

  const playlist = await playlistResponse.json();

  return res.status(200).json(playlist);
};
