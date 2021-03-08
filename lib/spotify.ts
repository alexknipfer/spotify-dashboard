import querystring from 'querystring';

import { SpotifyTokenResponse } from '@/models/Spotify';
import { appConfig } from '@/lib/appConfig';

const BASE_URL = `https://api.spotify.com/v1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const ME_ENDPOINT = `${BASE_URL}/me`;
const ARTISTS_ENDPOINT = `${BASE_URL}/artists`;
const TOP_TRACKS_OR_ARTISTS_ENDPOINT = `${ME_ENDPOINT}/top`;
const FOLLOWED_ARTISTS_ENDPOINT = `${ME_ENDPOINT}/following`;
const PLAYLISTS_ENDPOINT = `${ME_ENDPOINT}/playlists`;
const PLAYLISTS_ENDPOINT_ID = `${BASE_URL}/playlists`;
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
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  return response.json();
};

export const getProfile = async (accessToken: string) => {
  return fetch(ME_ENDPOINT, {
    headers: getHeaders(accessToken),
  });
};

export const getTopTracksOrArtists = async (
  accessToken: string,
  type: 'artists' | 'tracks',
  limit = 50,
  range = 'long_term',
) => {
  const queryParams = querystring.stringify({
    limit,
    time_range: range,
  });

  return fetch(`${TOP_TRACKS_OR_ARTISTS_ENDPOINT}/${type}?${queryParams}`, {
    headers: getHeaders(accessToken),
  });
};

export const getFollowedArtists = async (accessToken: string) => {
  return fetch(`${FOLLOWED_ARTISTS_ENDPOINT}?type=artist`, {
    headers: getHeaders(accessToken),
  });
};

export const getPlaylistById = async (
  accessToken: string,
  playlistId: string,
) => {
  return fetch(`${PLAYLISTS_ENDPOINT_ID}/${playlistId}`, {
    headers: getHeaders(accessToken),
  });
};

export const getPlaylists = async (
  accessToken: string,
  limit?: string,
  offset?: string,
) => {
  let url = PLAYLISTS_ENDPOINT;

  if (limit && offset) {
    url = `${PLAYLISTS_ENDPOINT}?offset=${offset}&limit=${limit}`;
  }

  return fetch(url, {
    headers: getHeaders(accessToken),
  });
};

export const getRecentlyPlayed = async (accessToken: string) => {
  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: getHeaders(accessToken),
  });
};

export const getArtistById = async (accessToken: string, artistId: string) => {
  return fetch(`${ARTISTS_ENDPOINT}/${artistId}`, {
    headers: getHeaders(accessToken),
  });
};

export const getTrackAudioFeaturesById = async (
  accessToken: string,
  trackId: string,
) => {
  return fetch(`${AUDIO_FEATURES_ENDPOINT}/${trackId}`, {
    headers: getHeaders(accessToken),
  });
};

export const getTrackById = async (accessToken: string, trackId: string) => {
  return fetch(`${TRACKS_ENDPOINT}/${trackId}`, {
    headers: getHeaders(accessToken),
  });
};

export const getNowPlayingTrack = async (accessToken: string) => {
  return fetch(`${NOW_PLAYING_ENDPOINT}`, {
    headers: getHeaders(accessToken),
  });
};
