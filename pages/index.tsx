import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';
import withAuthentication from 'hoc/withAuthentication';

const Home: NextPage = () => {
  const [session] = useSession();

  return (
    <>
      <div className="font-bold text-white text-5xl">alexanderknipfer</div>
      {!session && (
        <div className="text-white">
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
      {session && (
        <div className="text-white">
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </>
  );
};

export default withAuthentication(Home);
