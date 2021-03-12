import ArtistDetails from '@/components/ArtistDetails';
import HeadlineStatistic from '@/components/HeadlineStatistic';
import DashboardLayout from '@/layouts/DashboardLayout';
import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyArtist } from '@/models/Spotify';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Artist: NextPage = () => {
  const { query } = useRouter();
  const { data } = useSWR<SpotifyArtist>(
    query.id ? `${APIRoute.ARTIST}/${query.id}` : null,
  );

  return (
    <DashboardLayout>
      <ArtistDetails isLoading={!data} artist={data} />
      <div className="mb-10" />
      <HeadlineStatistic
        label="Monthly Listeners"
        value={Number(data?.followers?.total).toLocaleString()}
        isLoading={!data}
      />
      <div className="mb-10" />
      <HeadlineStatistic
        label="Popularity"
        value={`${data?.popularity}%`}
        isLoading={!data}
      />
    </DashboardLayout>
  );
};

export default Artist;
