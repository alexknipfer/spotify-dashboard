import { Fragment } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

import { SpotifyPaginatedResponse, SpotifyTrack } from '@/models/Spotify';
import ArtistCard from '@/components/ArtistCard';
import TrackCard from '@/components/TrackCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SkeletonList from '@/components/SkeletonList';
import Button from '@/components/Button';
import { RoutePath } from '@/models/RoutePath.enum';
import { getTopArtists, getTopTracks } from '@/lib/spotify';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const [topArtists, topTracks] = await Promise.all([
    getTopArtists<SpotifyPaginatedResponse<SpotifyTrack>>(
      session.accessToken,
      10,
    ),
    getTopTracks<SpotifyPaginatedResponse<SpotifyTrack>>(
      session.accessToken,
      10,
    ),
  ]);

  return (
    <Fragment>
      {/* @ts-expect-error Server Component */}
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20">
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg md:text-xl font-bold">
              Top Artists of All Time
            </h2>
            <Button
              variant="outline"
              buttonSize="small"
              hrefInternal={RoutePath.ARTISTS}
            >
              See More
            </Button>
          </div>
          <ul>
            {topArtists ? (
              topArtists.items.map((artistDetails: any) => (
                <li key={artistDetails.id}>
                  <ArtistCard
                    id={artistDetails.id}
                    name={artistDetails.name}
                    image={artistDetails.images[0]}
                  />
                </li>
              ))
            ) : (
              <SkeletonList skeletonComponent={<ArtistCard isLoading />} />
            )}
          </ul>
        </section>
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg md:text-xl font-bold">
              Top Tracks of All Time
            </h2>
            <Button
              variant="outline"
              buttonSize="small"
              hrefInternal={RoutePath.TRACKS}
            >
              See More
            </Button>
          </div>
          <ul>
            {topTracks ? (
              topTracks?.items?.map((trackDetails) => (
                <li key={trackDetails.id}>
                  <TrackCard
                    id={trackDetails.id}
                    name={trackDetails.name}
                    duration={trackDetails.duration_ms}
                    artists={trackDetails.artists}
                    album={trackDetails.album}
                  />
                </li>
              ))
            ) : (
              <SkeletonList skeletonComponent={<TrackCard isLoading />} />
            )}
          </ul>
        </section>
      </div>
    </Fragment>
  );
}
