import 'next-auth';
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
    user: User;
    expires: string;
    error: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    idToken?: string;
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    user: User;
    error?: string;
  }
}
