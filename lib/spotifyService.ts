import ky from 'ky';

import { appConfig } from '@/lib/appConfig';
import {
  PlaylistTrack,
  SpotifyArtist,
  SpotifyAudioFeatures,
  SpotifyCursorPaginatedResponse,
  SpotifyNowPlayingResponse,
  SpotifyPaginatedResponse,
  SpotifyPlaylist,
  SpotifyProfile,
  SpotifyRecentlyPlayed,
  SpotifyTimeRange,
  SpotifyTokenResponse,
  SpotifyTrack,
} from '@/models/Spotify';
import { Fetch } from '@/lib/fetch';

class SpotifyService extends Fetch {
  private static readonly BASE_URL = 'https://api.spotify.com/v1';
  private static readonly ME_ENDPOINT = `${SpotifyService.BASE_URL}/me`;
  private static readonly TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
  private static readonly ARTISTS_ENDPOINT = `${SpotifyService.BASE_URL}/artists`;
  private static readonly TOP_TRACKS_OR_ARTISTS_ENDPOINT = `${SpotifyService.ME_ENDPOINT}/top`;
  private static readonly FOLLOWED_ARTISTS_ENDPOINT = `${SpotifyService.ME_ENDPOINT}/following`;
  private static readonly USER_PLAYLISTS_ENDPOINT = `${SpotifyService.ME_ENDPOINT}/playlists`;
  private static readonly PLAYLISTS_ENDPOINT = `${SpotifyService.BASE_URL}/playlists`;
  private static readonly RECENTLY_PLAYED_ENDPOINT = `${SpotifyService.ME_ENDPOINT}/player/recently-played`;
  private static readonly AUDIO_FEATURES_ENDPOINT = `${SpotifyService.BASE_URL}/audio-features`;
  private static readonly TRACKS_ENDPOINT = `${SpotifyService.BASE_URL}/tracks`;
  private static readonly NOW_PLAYING_ENDPOINT = `${SpotifyService.ME_ENDPOINT}/player/currently-playing`;
  private static readonly AUTH_TOKEN = Buffer.from(
    `${appConfig.spotify.clientId}:${appConfig.spotify.clientSecret}`,
  ).toString('base64');

  private spotifyApi = ky.create({});

  public getProfile() {
    return this.spotifyApi
      .get(SpotifyService.ME_ENDPOINT)
      .json<SpotifyProfile>();
  }

  public getTopArtists(limit = 50, range = SpotifyTimeRange.LONG_TERM) {
    return this.getTopStats<SpotifyArtist>('artists', limit, range);
  }

  public getTopTracks(limit = 50, range = SpotifyTimeRange.LONG_TERM) {
    return this.getTopStats<SpotifyTrack>('tracks', limit, range);
  }

  public async getFollowedArtistsCount() {
    const response = await this.spotifyApi
      .get(`${SpotifyService.FOLLOWED_ARTISTS_ENDPOINT}?type=artist`)
      .json<{ artists: SpotifyPaginatedResponse<SpotifyArtist> }>();

    return response.artists.items.length;
  }

  public getPlaylistById(playlistId: string) {
    return this.spotifyApi
      .get(`${SpotifyService.PLAYLISTS_ENDPOINT}/${playlistId}`)
      .json<SpotifyPlaylist>();
  }

  public getPlaylistTracks(
    playlistId: string,
    limit?: string,
    offset?: string,
  ) {
    let url = `${SpotifyService.PLAYLISTS_ENDPOINT}/${playlistId}/tracks`;

    if (limit && offset) {
      url = `${SpotifyService.PLAYLISTS_ENDPOINT}/${playlistId}/tracks/?offset=${offset}&limit=${limit}`;
    }

    return this.spotifyApi
      .get(url)
      .json<SpotifyPaginatedResponse<PlaylistTrack>>();
  }

  public async getPlaylistsTotal(limit?: string, offset?: string) {
    let url = SpotifyService.USER_PLAYLISTS_ENDPOINT;

    if (limit && offset) {
      url = `${SpotifyService.USER_PLAYLISTS_ENDPOINT}?offset=${offset}&limit=${limit}`;
    }

    const playlists = await this.spotifyApi
      .get(url)
      .json<SpotifyPaginatedResponse<SpotifyPlaylist>>();

    return playlists.total;
  }

  public getRecentlyPlayed() {
    return this.get<SpotifyCursorPaginatedResponse<SpotifyRecentlyPlayed>>(
      SpotifyService.RECENTLY_PLAYED_ENDPOINT,
    );
  }

  public getArtistById(artistId: string) {
    return this.spotifyApi
      .get(`${SpotifyService.ARTISTS_ENDPOINT}/${artistId}`)
      .json<SpotifyArtist>();
  }

  public getTrackAudioFeaturesById(trackId: string) {
    return this.spotifyApi
      .get(`${SpotifyService.AUDIO_FEATURES_ENDPOINT}/${trackId}`)
      .json<SpotifyAudioFeatures>();
  }

  public getTrackById(trackId: string) {
    return this.spotifyApi
      .get(`${SpotifyService.TRACKS_ENDPOINT}/${trackId}`)
      .json<SpotifyTrack>();
  }

  public getNowPlayingTrack() {
    return this.spotifyApi
      .get(SpotifyService.NOW_PLAYING_ENDPOINT)
      .json<SpotifyNowPlayingResponse>();
  }

  public getAccessToken = async (
    refreshToken: string,
  ): Promise<SpotifyTokenResponse> => {
    const response = await fetch(SpotifyService.TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${SpotifyService.AUTH_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    return response.json();
  };

  private async getTopStats<ResponseType>(
    type: 'artists' | 'tracks',
    limit: number,
    range: SpotifyTimeRange,
  ) {
    const params = new URLSearchParams();
    params.set('limit', limit.toString());
    params.set('time_range', range);

    return this.get<SpotifyPaginatedResponse<ResponseType>>(
      `${
        SpotifyService.TOP_TRACKS_OR_ARTISTS_ENDPOINT
      }/${type}?${params.toString()}`,
    );
  }
}

export const spotifyService = new SpotifyService();
