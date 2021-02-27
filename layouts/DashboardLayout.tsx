import { Fragment } from 'react';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <nav className="sticky top-0 z-20 h-24 bg-black w-full mb-10 shadow-lg" />
      <main className="px-28 h-screen max-w-screen-2xl">{children}</main>
    </Fragment>
  );
};

export default DashboardLayout;
