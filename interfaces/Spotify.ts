export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface SpotifyProfile {
  display_name: string;
  email: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: string[];
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: null;
  total: number;
}
