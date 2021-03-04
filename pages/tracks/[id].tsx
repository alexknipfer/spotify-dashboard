import { NextPage } from 'next';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import useSWR from 'swr';
import { APIRoute } from '@/models/APIRoute.enum';
import AudioFeaturesChart from '@/components/AudioFeaturesChart';
import TrackDetails from '@/components/TrackDetails';
import { SpotifyAudioFeatures, SpotifyTrack } from '@/models/Spotify';
import HeadlineStatistic from '@/components/HeadlineStatistic';
import { millisToMinutesAndSeconds } from '@/lib/utils';

interface TrackDetailsResponse {
  audioFeatures: SpotifyAudioFeatures;
  track: SpotifyTrack;
}

const Track: NextPage = () => {
  const { query } = useRouter();
  const { data } = useSWR<TrackDetailsResponse>(
    `${APIRoute.TRACK_DETAILS}/${query.id}`,
  );

  return (
    <DashboardLayout>
      <TrackDetails isLoading={!data} track={data?.track} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10">
        <HeadlineStatistic
          label="Popularity"
          value={`${data?.track.popularity}%`}
          isLoading={!data}
        />
        <HeadlineStatistic
          label="Loudness"
          value={`${data?.audioFeatures.loudness}`}
          isLoading={!data}
        />
        <HeadlineStatistic
          label="Tempo (BPM)"
          value={`${Math.round(data?.audioFeatures.tempo)}`}
          isLoading={!data}
        />
        <HeadlineStatistic
          label="Duration"
          value={millisToMinutesAndSeconds(data?.track.duration_ms)}
          isLoading={!data}
        />
      </div>
      {data?.audioFeatures && (
        <AudioFeaturesChart audioFeatures={data.audioFeatures} />
      )}
    </DashboardLayout>
  );
};

export default Track;
