const ME_ENDPOINT = 'https://api.spotify.com/v1/me';

export const getProfile = async (accessToken: string) => {
  return fetch(ME_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
