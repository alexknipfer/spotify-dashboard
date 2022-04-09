import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { getTrackAudioFeaturesById, getTrackById } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';

type NextAPIRequestWithId = NextApiRequest & {
  query: {
    id: string;
  };
};

export default async (req: NextAPIRequestWithId, res: NextApiResponse) => {
  const session = await getSession({ req });

  const { id } = req.query;

  const [audioFeaturesResponse, trackResponse] = await Promise.all([
    getTrackAudioFeaturesById(session.accessToken, id),
    getTrackById(session.accessToken, id),
  ]);

  if (
    isBadStatusCode(audioFeaturesResponse) ||
    isBadStatusCode(trackResponse)
  ) {
    return res.status(400).json({
      error: 'Failed to fetch track details.',
    });
  }

  const [audioFeatures, track] = await Promise.all([
    audioFeaturesResponse.json(),
    trackResponse.json(),
  ]);

  return res.status(200).json({
    audioFeatures,
    track,
  });
};
