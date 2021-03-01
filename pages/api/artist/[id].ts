import { getArtistById } from '@/lib/spotify';
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

  const artistResponse = await getArtistById(session.accessToken, id);

  if (isBadStatusCode(artistResponse)) {
    return res.status(400).json({
      error: 'Failed to fetch recently played tracks.',
    });
  }

  const artist = await artistResponse.json();

  return res.status(200).json(artist);
};
