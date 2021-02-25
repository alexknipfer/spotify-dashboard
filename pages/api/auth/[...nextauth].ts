import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import { appConfig } from '@/lib/appConfig';

const options: InitOptions = {
  providers: [
    Providers.Spotify({
      clientId: appConfig.spotify.clientId,
      clientSecret: appConfig.spotify.clientSecret,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt(token, _, account) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.accessToken;
      }

      return token;
    },
    async session(session, user) {
      session.user = user;

      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
