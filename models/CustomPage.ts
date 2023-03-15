import { NextPage } from 'next';
import { AppProps } from 'next/app';

export type CustomPage = NextPage & {
  redirectUnauthenticatedTo?: string;
  redirectAuthenticatedTo?: string;
  suppressFirstRenderFlicker?: boolean;
  skeletonLoader?: React.ReactNode;
};

export interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomPage;
}
