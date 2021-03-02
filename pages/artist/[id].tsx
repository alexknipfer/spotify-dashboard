import ArtistDetails from '@/components/ArtistDetails';
import ArtistStatistic from '@/components/ArtistStatistic';
import DashboardLayout from '@/layouts/DashboardLayout';
import { APIRoute } from '@/models/APIRoute.enum';
import { SpotifyArtist } from '@/models/Spotify';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Artist: NextPage = () => {
  const { query } = useRouter();
  const { data } = useSWR<SpotifyArtist>(`${APIRoute.ARTIST}/${query.id}`);

  return (
    <DashboardLayout>
      <ArtistDetails isLoading={!data} artist={data} />
      <div className="mb-10" />
      <ArtistStatistic
        label="Monthly Listeners"
        value={Number(data?.followers?.total).toLocaleString()}
        isLoading={!data}
      />
      <div className="mb-10" />
      <ArtistStatistic
        label="Popularity"
        value={`${data?.popularity}%`}
        isLoading={!data}
      />
    </DashboardLayout>
  );
};

export default Artist;
