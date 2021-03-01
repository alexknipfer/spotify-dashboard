import { SpotifyProfile } from '@/models/Spotify';
import { Fragment } from 'react';
import classnames from 'classnames';
import Statistic from '@/components/dashboard/Statistic';

import ProfileIcon from '../../public/static/icons/profile_icon.svg';

interface Props {
  isLoading: boolean;
  profile: SpotifyProfile;
  followingCount: number;
  playlistCount: number;
}

const DashboardHeader: React.FC<Props> = ({
  isLoading,
  profile,
  followingCount,
  playlistCount,
}) => {
  return (
    <header
      className={classnames('flex flex-col justify-center items-center', {
        'animate-pulse': isLoading,
      })}
    >
      {isLoading ? (
        <Fragment>
          <div className="rounded-full bg-gray-600 h-40 w-40 mb-6" />
          <div className=" bg-gray-600 w-7/12 md:w-60 h-7 md:h-11 rounded mb-6" />
          <div className=" bg-gray-600 w-9/12 md:w-96 h-11 rounded mb-6" />
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex justify-center items-center h-40 w-40 border border-white rounded-full p-7 mb-6">
            <ProfileIcon fill="#fff" width="100%" height="100%" />
          </div>
          <h1 className="text-white font-bold text-3xl md:text-5xl mb-6">
            {profile.display_name}
          </h1>
          <div className="flex">
            <Statistic label="Followers" count={profile.followers.total} />
            <Statistic label="Following" count={followingCount} />
            <Statistic label="Playlists" count={playlistCount} />
          </div>
        </Fragment>
      )}
    </header>
  );
};

export default DashboardHeader;
