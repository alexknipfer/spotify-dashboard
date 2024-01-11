import { Fragment } from 'react';

import TopMenu from '@/components/navigation/top-menu';

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  return (
    <Fragment>
      <TopMenu />
      <main className="px-6 md:px-16 lg:px-28 pt-10 pb-20 max-w-screen-2xl mx-auto">
        {children}
      </main>
    </Fragment>
  );
}
