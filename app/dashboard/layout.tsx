import { Fragment } from 'react';

import Nav from '@/components/Nav';

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Fragment>
      <Nav />
      <main className="px-6 md:px-16 lg:px-28 pt-10 pb-20 max-w-screen-2xl mx-auto">
        {children}
      </main>
    </Fragment>
  );
}
