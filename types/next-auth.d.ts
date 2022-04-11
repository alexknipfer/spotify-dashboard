import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
    user: User;
    expires: string;
    error: string;
  }
  // interface User {
  //   accessToken: string;
  //   accessTokenExpires: number;
  //   refreshToken: string;
  //   user: {
  //     id: string;
  //     email: string;
  //     name: string;
  //   };
  //   iat: number;
  //   exp: number;
  //   error?: string;
  // }
}
