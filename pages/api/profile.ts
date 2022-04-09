import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { getFollowedArtists, getPlaylists, getProfile } from '@/lib/spotify';
import { isBadStatusCode } from '@/lib/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  const [profileResponse, followingResponse, playlistsResponse] =
    await Promise.all([
      getProfile(session.accessToken),
      getFollowedArtists(session.accessToken),
      getPlaylists(session.accessToken),
    ]);

  if (
    isBadStatusCode(profileResponse) ||
    isBadStatusCode(followingResponse) ||
    isBadStatusCode(playlistsResponse)
  ) {
    return res.status(400).json({
      error: 'Failed to get spotify user profile.',
    });
  }

  const [profile, following, playlists] = await Promise.all([
    profileResponse.json(),
    followingResponse.json(),
    playlistsResponse.json(),
  ]);

  return res.status(200).json({
    profile,
    followingCount: following.artists.items.length,
    playlistCount: playlists.total,
  });
};
