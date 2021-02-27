import { SpotifyProfile, SpotifyTopArtists } from '@/interfaces/Spotify';
import { Fragment } from 'react';
import useSWR from 'swr';

import DashboardHeader from './DashboardHeader';

interface Props {
  isLoading?: boolean;
}

const Dashboard: React.FC<Props> = () => {
  const { data } = useSWR<SpotifyProfile>('/api/get-profile');
  const { data: topArtists } = useSWR<SpotifyTopArtists>('/api/top-artists');

  return (
    <Fragment>
      <DashboardHeader isLoading={!data} profile={data} />
      <section className="grid grid-cols-2 gap-5">
        <div>
          <h2 className="text-xl font-bold">Top Artists of All Time</h2>
          {topArtists?.items.map((artistDetails) => (
            <div key={artistDetails.id} className="mb-2">
              {artistDetails.name}
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
