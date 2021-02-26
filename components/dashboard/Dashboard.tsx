import { SpotifyProfile } from '@/interfaces/Spotify';
import useSWR from 'swr';

import DashboardHeader from './DashboardHeader';

interface Props {
  isLoading?: boolean;
}

const Dashboard: React.FC<Props> = () => {
  const { data, error } = useSWR<SpotifyProfile>('/api/get-profile');

  const isLoading = !data && !error;

  return <DashboardHeader isLoading={isLoading} profile={data} />;
};

export default Dashboard;
