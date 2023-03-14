import { Fragment } from 'react';

import { spotifyService } from '../../../../../lib/spotify';

import AudioFeaturesChart from './components/AudioFeaturesChart';
import TrackDetails from './components/TrackDetails';

import HeadlineStatistic from '@/components/HeadlineStatistic';
import { millisToMinutesAndSeconds } from '@/lib/utils';

interface Props {
  params: { id: string };
}

export default async function Track({ params }: Props) {
  const [track, audioFeatures] = await Promise.all([
    spotifyService.getTrackById(params.id),
    spotifyService.getTrackAudioFeaturesById(params.id),
  ]);

  return (
    <Fragment>
      <TrackDetails track={track} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10">
        <HeadlineStatistic label="Popularity" value={`${track.popularity}%`} />
        <HeadlineStatistic
          label="Loudness"
          value={`${audioFeatures.loudness}`}
        />
        <HeadlineStatistic
          label="Tempo (BPM)"
          value={`${Math.round(audioFeatures.tempo || 0)}`}
        />
        <HeadlineStatistic
          label="Duration"
          value={millisToMinutesAndSeconds(track.duration_ms || 0)}
        />
      </div>
      <AudioFeaturesChart audioFeatures={audioFeatures} />
    </Fragment>
  );
}
