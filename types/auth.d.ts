import 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
    iat: number;
    exp: number;
    error?: string;
  }
}
