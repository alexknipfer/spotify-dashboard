import { Fragment } from 'react';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <main className="flex flex-col justify-center items-center h-screen max-w-screen-2xl mx-auto">
      {children}
    </main>
  );
};

export default AuthLayout;
