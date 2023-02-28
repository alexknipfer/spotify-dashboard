'use client';

import useSWR from 'swr';
import { Fragment } from 'react';

import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyAudioFeatures, SpotifyTrack } from '@/models/Spotify';
import TrackDetails from '@/components/TrackDetails';
import HeadlineStatistic from '@/components/HeadlineStatistic';
import { millisToMinutesAndSeconds } from '@/lib/utils';
import AudioFeaturesChart from '@/components/AudioFeaturesChart';

interface Props {
  params: { id: string };
}

interface TrackDetailsResponse {
  audioFeatures: SpotifyAudioFeatures;
  track: SpotifyTrack;
}

export default function Track({ params }: Props) {
  const { data } = useSWR<TrackDetailsResponse>(
    `${APIRoute.TRACK_DETAILS}/${params.id}`,
  );

  return (
    <Fragment>
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
          value={`${Math.round(data?.audioFeatures.tempo || 0)}`}
          isLoading={!data}
        />
        <HeadlineStatistic
          label="Duration"
          value={millisToMinutesAndSeconds(data?.track.duration_ms || 0)}
          isLoading={!data}
        />
      </div>
      {data?.audioFeatures && (
        <AudioFeaturesChart audioFeatures={data.audioFeatures} />
      )}
    </Fragment>
  );
}
