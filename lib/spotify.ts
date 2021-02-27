import querystring from 'querystring';

import { SpotifyTokenResponse } from '@/interfaces/Spotify';
import { appConfig } from '@/lib/appConfig';

const authToken = Buffer.from(
  `${appConfig.spotify.clientId}:${appConfig.spotify.clientSecret}`,
).toString('base64');

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const ME_ENDPOINT = 'https://api.spotify.com/v1/me';

export const getAccessToken = async (
  refreshToken: string,
): Promise<SpotifyTokenResponse> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  return response.json();
};

export const getProfile = async (accessToken: string) => {
  return fetch(ME_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
