import { CustomPage } from '@/interfaces/CustomPage';
import Dashboard from '@/components/dashboard/Dashboard';
import withAuthentication from 'hoc/WithAuthentication';
import DashboardLayout from '@/layouts/DashboardLayout';

const Home: CustomPage = () => {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

export default withAuthentication(Home);
