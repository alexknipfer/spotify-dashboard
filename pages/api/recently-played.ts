import { getRecentlyPlayed } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  const recentlyPlayedResponse = await getRecentlyPlayed(session.accessToken);

  if (isBadStatusCode(recentlyPlayedResponse)) {
    return res.status(400).json({
      error: 'Failed to fetch recently played tracks.',
    });
  }

  const recentlyPlayed = await recentlyPlayedResponse.json();

  return res.status(200).json(recentlyPlayed);
};
