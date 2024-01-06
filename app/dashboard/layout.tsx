import { Fragment } from 'react';

import NavContainer from '@/components/NavContainer';

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  return (
    <Fragment>
      <div className="border-b border-zinc-800">
        <NavContainer />
      </div>
      <main className="px-6 md:px-16 lg:px-28 pt-10 pb-20 max-w-screen-2xl mx-auto">
        {children}
      </main>
    </Fragment>
  );
}
