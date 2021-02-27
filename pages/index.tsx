import { CustomPage } from '@/interfaces/CustomPage';
import Dashboard from '@/components/dashboard/Dashboard';
import { useSession } from 'next-auth/client';
import withAuthentication from 'hoc/WithAuthentication';

const Home: CustomPage = () => {
  const [session] = useSession();

  console.log('HOME SESSION: ', session);

  return <Dashboard />;
};

Home.redirectUnauthenticatedTo = '/login';

export default withAuthentication(Home);
