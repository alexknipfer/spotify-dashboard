import { SpotifyProfile } from '@/interfaces/Spotify';
import { Fragment } from 'react';
import classnames from 'classnames';

import ProfileIcon from '../../public/static/icons/profile_icon.svg';
import Statistic from './Statistic';

interface Props {
  isLoading: boolean;
  profile: SpotifyProfile;
}

const DashboardHeader: React.FC<Props> = ({ isLoading, profile }) => {
  return (
    <header
      className={classnames('flex flex-col justify-center items-center', {
        'animate-pulse': isLoading,
      })}
    >
      {isLoading ? (
        <Fragment>
          <div className="rounded-full bg-gray-600 h-40 w-40 mb-6" />
          <div className="animate-pulse bg-gray-600 w-60 h-11 rounded mb-6" />
          <div className="animate-pulse bg-gray-600 w-96 h-11 rounded mb-6" />
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex justify-center items-center h-40 w-40 border border-white rounded-full p-7 mb-6">
            <ProfileIcon fill="#fff" />
          </div>
          <div className="text-white font-bold text-5xl mb-6">
            {profile.display_name}
          </div>
          <div className="flex">
            <Statistic label="Followers" count={profile.followers.total} />
            <Statistic label="Following" count={44} />
            <Statistic label="Playlists" count={34} />
          </div>
        </Fragment>
      )}
    </header>
  );
};

export default DashboardHeader;
