import { getTopTracksOrArtists } from '@/lib/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  const response = await getTopTracksOrArtists(session.accessToken, 'artists');

  if (response.status === 204 || response.status > 400) {
    return res.status(400).json({
      error: 'Failed to fetch top artists.',
    });
  }

  const topArtists = await response.json();

  return res.status(200).json(topArtists);
};
