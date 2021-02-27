import { SpotifyProfile } from '@/interfaces/Spotify';
import useSWR from 'swr';

import DashboardHeader from './DashboardHeader';

interface Props {
  isLoading?: boolean;
}

const Dashboard: React.FC<Props> = () => {
  const { data, error } = useSWR<SpotifyProfile>('/api/get-profile');

  return <DashboardHeader isLoading={!data} profile={data} />;
};

export default Dashboard;
