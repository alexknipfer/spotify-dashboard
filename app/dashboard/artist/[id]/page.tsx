import { Fragment } from 'react';

import ArtistDetails from '@/components/ArtistDetails';
import HeadlineStatistic from '@/components/HeadlineStatistic';
import { spotifyService } from '@/lib/spotify';

interface Props {
  params: { id: string };
}

export const revalidate = 60;

export default async function Artist({ params }: Props) {
  const data = await spotifyService.getArtistById(params.id);

  return (
    <Fragment>
      <ArtistDetails artist={data} />
      <div className="mb-10" />
      <HeadlineStatistic
        label="Monthly Listeners"
        value={Number(data?.followers?.total).toLocaleString()}
      />
      <div className="mb-10" />
      <HeadlineStatistic label="Popularity" value={`${data?.popularity}%`} />
    </Fragment>
  );
}
