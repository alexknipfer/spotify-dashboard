import { CustomPage } from '@/interfaces/CustomPage';
import Dashboard from '@/components/dashboard/Dashboard';

const Home: CustomPage = () => {
  return <Dashboard />;
};

Home.redirectUnauthenticatedTo = '/login';

export default Home;
