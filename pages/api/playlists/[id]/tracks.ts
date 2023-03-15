import { NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { getPlaylistTracks } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';
import { NextAPIRequestWithPagination } from '@/models/NextAPIRequestWithPagination';

export default async (
  req: NextAPIRequestWithPagination,
  res: NextApiResponse,
) => {
  const session = await getSession({ req });

  const { id, limit, offset } = req.query;

  const playlistTrackResponse = await getPlaylistTracks(
    session.accessToken,
    id,
    limit,
    offset,
  );

  if (isBadStatusCode(playlistTrackResponse)) {
    return res.status(400).json({
      error: 'Failed to fetch playlist tracks.',
    });
  }

  const playlistTracks = await playlistTrackResponse.json();

  return res.status(200).json(playlistTracks);
};
