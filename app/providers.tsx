'use client';

import { SessionProvider } from 'next-auth/react';

import CustomSWRConfig from '@/components/CustomSWRConfig';

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <CustomSWRConfig>{children}</CustomSWRConfig>
    </SessionProvider>
  );
}
