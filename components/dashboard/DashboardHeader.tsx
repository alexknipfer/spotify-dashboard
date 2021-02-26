import { SpotifyProfile } from '@/interfaces/Spotify';
import { Fragment } from 'react';

interface Props {
  isLoading: boolean;
  profile: SpotifyProfile;
}

const DashboardHeader: React.FC<Props> = ({ isLoading, profile }) => {
  return (
    <header className="flex flex-col justify-center items-center">
      {isLoading ? (
        <Fragment>
          <div className="animate-pulse rounded-full bg-gray-600 h-40 w-40 mb-6" />
          <div className="animate-pulse bg-gray-600 w-60 h-11 rounded mb-6" />
          <div className="animate-pulse bg-gray-600 w-96 h-11 rounded mb-6" />
        </Fragment>
      ) : (
        <Fragment>
          <div className="rounded-full bg-gray-600 h-40 w-40 mb-6" />
          <div className="text-white font-bold text-5xl mb-6">
            {profile.display_name}
          </div>
          <div className="animate-pulse bg-gray-600 w-96 h-11 rounded mb-6" />
        </Fragment>
      )}
    </header>
  );
};

export default DashboardHeader;
