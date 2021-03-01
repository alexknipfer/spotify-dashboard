const AuthLayout: React.FC = ({ children }) => {
  return (
    <main className="flex flex-col justify-center h-screen items-center max-w-screen-2xl mx-auto">
      {children}
    </main>
  );
};

export default AuthLayout;
