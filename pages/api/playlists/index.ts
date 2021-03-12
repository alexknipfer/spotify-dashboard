import { getPlaylists } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';
import { NextApiResponse } from 'next';
import { NextAPIRequestWithPagination } from '@/models/NextAPIRequestWithPagination';
import { getSession } from 'next-auth/client';

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
