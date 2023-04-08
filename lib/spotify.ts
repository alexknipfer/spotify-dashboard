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

class SpotifyService {
  private fetch: Fetch;
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

  constructor() {
    this.fetch = new Fetch();
  }

  public getProfile() {
    return this.fetch.get<SpotifyProfile>(SpotifyService.ME_ENDPOINT);
  }

  public getTopArtists(limit = 50, range = SpotifyTimeRange.LONG_TERM) {
    return this.getTopStats<SpotifyArtist>('artists', limit, range);
  }

  public getTopTracks(limit = 50, range = SpotifyTimeRange.LONG_TERM) {
    return this.getTopStats<SpotifyTrack>('tracks', limit, range);
  }

  public async getFollowedArtistsCount() {
    const response = await this.fetch.get<{
      artists: SpotifyPaginatedResponse<SpotifyArtist>;
    }>(`${SpotifyService.FOLLOWED_ARTISTS_ENDPOINT}?type=artist`);

    return response.artists.items.length;
  }

  public getPlaylistById(playlistId: string) {
    return this.fetch.get<SpotifyPlaylist>(
      `${SpotifyService.PLAYLISTS_ENDPOINT}/${playlistId}`,
    );
  }

  public getPlaylistTracks(
    playlistId: string,
    limit?: string | null,
    offset?: string | null,
  ) {
    let url = `${SpotifyService.PLAYLISTS_ENDPOINT}/${playlistId}/tracks`;

    if (limit && offset) {
      url = `${SpotifyService.PLAYLISTS_ENDPOINT}/${playlistId}/tracks/?offset=${offset}&limit=${limit}`;
    }

    return this.fetch.get<SpotifyPaginatedResponse<PlaylistTrack>>(url);
  }

  public async getPlaylists(limit?: string | null, offset?: string | null) {
    let url = SpotifyService.USER_PLAYLISTS_ENDPOINT;

    if (limit && offset) {
      url = `${SpotifyService.USER_PLAYLISTS_ENDPOINT}?offset=${offset}&limit=${limit}`;
    }

    const playlists = await this.fetch.get<
      SpotifyPaginatedResponse<SpotifyPlaylist>
    >(url);

    return playlists;
  }

  public getRecentlyPlayed() {
    return this.fetch.get<
      SpotifyCursorPaginatedResponse<SpotifyRecentlyPlayed>
    >(SpotifyService.RECENTLY_PLAYED_ENDPOINT);
  }

  public getArtistById(artistId: string) {
    return this.fetch.get<SpotifyArtist>(
      `${SpotifyService.ARTISTS_ENDPOINT}/${artistId}`,
    );
  }

  public getTrackAudioFeaturesById(trackId: string) {
    return this.fetch.get<SpotifyAudioFeatures>(
      `${SpotifyService.AUDIO_FEATURES_ENDPOINT}/${trackId}`,
    );
  }

  public getTrackById(trackId: string) {
    return this.fetch.get<SpotifyTrack>(
      `${SpotifyService.TRACKS_ENDPOINT}/${trackId}`,
    );
  }

  public getNowPlayingTrack() {
    return this.fetch.get<SpotifyNowPlayingResponse>(
      SpotifyService.NOW_PLAYING_ENDPOINT,
    );
  }

  public async getAccessToken(refreshToken: string) {
    return this.fetch.post<SpotifyTokenResponse>(
      SpotifyService.TOKEN_ENDPOINT,
      new Headers({
        Authorization: `Basic ${SpotifyService.AUTH_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    );
  }

  private async getTopStats<ResponseType>(
    type: 'artists' | 'tracks',
    limit: number,
    range: SpotifyTimeRange,
  ) {
    const params = new URLSearchParams();
    params.set('limit', limit.toString());
    params.set('time_range', range);

    return this.fetch.get<SpotifyPaginatedResponse<ResponseType>>(
      `${
        SpotifyService.TOP_TRACKS_OR_ARTISTS_ENDPOINT
      }/${type}?${params.toString()}`,
    );
  }
}

export const spotifyService = new SpotifyService();
