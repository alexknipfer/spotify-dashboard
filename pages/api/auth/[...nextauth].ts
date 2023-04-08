import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { Account, NextAuthOptions, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

import { appConfig } from '@/lib/appConfig';
import { spotifyService } from '@/lib/spotify';

const SPOTIFY_SCOPES = [
  'user-read-email',
  'user-top-read',
  'user-follow-read',
  'user-read-recently-played',
  'playlist-read-private',
  'user-read-currently-playing',
];

const refreshToken = async (token: JWT) => {
  try {
    const refreshedTokens = await spotifyService.getAccessToken(
      token.refreshToken,
    );

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      authorization: {
        params: { scope: SPOTIFY_SCOPES.join(' ') },
      },
      clientId: appConfig.spotify.clientId,
      clientSecret: appConfig.spotify.clientSecret,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: any;
      account: Account | null;
      user: User;
    }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at || 0 * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshToken(token);
    },
    async session({ session, token }: any) {
      if (token) {
        return {
          user: session.user,
          accessToken: token.accessToken,
          expires: session.expires,
          error: token.error,
        };
      }

      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);
