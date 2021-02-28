import { Fragment } from 'react';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <nav className="sticky top-0 z-20 h-24 bg-black w-full shadow-lg" />
      <main className="px-5 md:px-28 py-10 max-w-screen-2xl mx-auto min-h-screen">
        {children}
      </main>
    </Fragment>
  );
};

export default DashboardLayout;
