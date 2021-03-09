import { getPlaylistByTracks } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

type NextAPIRequestWithId = NextApiRequest & {
  query: {
    id: string;
  };
};

export default async (req: NextAPIRequestWithId, res: NextApiResponse) => {
  const session = await getSession({ req });

  const { id } = req.query;

  const playlistTrackResponse = await getPlaylistByTracks(
    session.accessToken,
    id,
  );

  if (isBadStatusCode(playlistTrackResponse)) {
    return res.status(400).json({
      error: 'Failed to fetch playlist tracks.',
    });
  }

  const playlistTracks = await playlistTrackResponse.json();

  return res.status(200).json(playlistTracks);
};
