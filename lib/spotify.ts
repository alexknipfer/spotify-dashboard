import { SpotifyProfile, SpotifyTokenResponse } from '@/models/Spotify';
import { appConfig } from '@/lib/appConfig';

const BASE_URL = `https://api.spotify.com/v1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const ME_ENDPOINT = `${BASE_URL}/me`;
const ARTISTS_ENDPOINT = `${BASE_URL}/artists`;
const TOP_TRACKS_OR_ARTISTS_ENDPOINT = `${ME_ENDPOINT}/top`;
const FOLLOWED_ARTISTS_ENDPOINT = `${ME_ENDPOINT}/following`;
const USER_PLAYLISTS_ENDPOINT = `${ME_ENDPOINT}/playlists`;
const PLAYLISTS_ENDPOINT = `${BASE_URL}/playlists`;
const RECENTLY_PLAYED_ENDPOINT = `${ME_ENDPOINT}/player/recently-played`;
const AUDIO_FEATURES_ENDPOINT = `${BASE_URL}/audio-features`;
const TRACKS_ENDPOINT = `${BASE_URL}/tracks`;
const NOW_PLAYING_ENDPOINT = `${ME_ENDPOINT}/player/currently-playing`;

const authToken = Buffer.from(
  `${appConfig.spotify.clientId}:${appConfig.spotify.clientSecret}`,
).toString('base64');

const getHeaders = (accessToken: string) =>
  new Headers({
    Authorization: `Bearer ${accessToken}`,
  });

export const getAccessToken = async (
  refreshToken: string,
): Promise<SpotifyTokenResponse> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  return response.json();
};

export const getProfile = async (
  accessToken: string,
): Promise<SpotifyProfile> => {
  const response = await fetch(ME_ENDPOINT, {
    headers: getHeaders(accessToken),
  });

  return response.json();
};

const getTopStats =
  (type: 'artists' | 'tracks') =>
  async <ResponseType>(
    accessToken: string,
    limit = 50,
    range = 'long_term',
  ): Promise<ResponseType> => {
    const response = await fetch(
      `${TOP_TRACKS_OR_ARTISTS_ENDPOINT}/${type}?limit=${limit}&time_range=${range}`,
      {
        headers: getHeaders(accessToken),
      },
    );

    return response.json();
  };

export const getTopArtists = getTopStats('artists');
export const getTopTracks = getTopStats('tracks');
export const getFollowedArtistsCount = async (
  accessToken: string,
): Promise<number> => {
  const response = await fetch(`${FOLLOWED_ARTISTS_ENDPOINT}?type=artist`, {
    headers: getHeaders(accessToken),
  });

  const following = await response.json();

  return following.artists.items.length;
};

export const getPlaylistById = async (
  accessToken: string,
  playlistId: string,
) =>
  fetch(`${PLAYLISTS_ENDPOINT}/${playlistId}`, {
    headers: getHeaders(accessToken),
  });

export const getPlaylistTracks = async (
  accessToken: string,
  playlistId: string,
  limit?: string,
  offset?: string,
) => {
  let url = `${PLAYLISTS_ENDPOINT}/${playlistId}/tracks`;

  if (limit && offset) {
    url = `${PLAYLISTS_ENDPOINT}/${playlistId}/tracks/?offset=${offset}&limit=${limit}`;
  }

  return fetch(url, {
    headers: getHeaders(accessToken),
  });
};

export const getPlaylistsTotal = async (
  accessToken: string,
  limit?: string,
  offset?: string,
): Promise<number> => {
  let url = USER_PLAYLISTS_ENDPOINT;

  if (limit && offset) {
    url = `${USER_PLAYLISTS_ENDPOINT}?offset=${offset}&limit=${limit}`;
  }

  const response = await fetch(url, {
    headers: getHeaders(accessToken),
  });

  const playlists = await response.json();

  return playlists.total;
};

export const getRecentlyPlayed = async (accessToken: string) => {
  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: getHeaders(accessToken),
  });
};

export const getArtistById = async (accessToken: string, artistId: string) =>
  fetch(`${ARTISTS_ENDPOINT}/${artistId}`, {
    headers: getHeaders(accessToken),
  });

export const getTrackAudioFeaturesById = async (
  accessToken: string,
  trackId: string,
) =>
  fetch(`${AUDIO_FEATURES_ENDPOINT}/${trackId}`, {
    headers: getHeaders(accessToken),
  });

export const getTrackById = async (accessToken: string, trackId: string) =>
  fetch(`${TRACKS_ENDPOINT}/${trackId}`, {
    headers: getHeaders(accessToken),
  });

export const getNowPlayingTrack = async (accessToken: string) =>
  fetch(`${NOW_PLAYING_ENDPOINT}`, {
    headers: getHeaders(accessToken),
  });
