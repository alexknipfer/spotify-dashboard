import { CustomPage } from '@/interfaces/CustomPage';
import Dashboard from '@/components/dashboard/Dashboard';
import withAuthentication from 'hoc/WithAuthentication';

const Home: CustomPage = () => {
  return <Dashboard />;
};

export default withAuthentication(Home);
