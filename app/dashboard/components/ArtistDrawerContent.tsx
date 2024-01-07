import Image from 'next/image';
import { Fragment } from 'react';

import Heading from '@/components/Heading';
import { SpotifyArtist } from '@/models/Spotify';
import HeadlineStatistic from '@/components/HeadlineStatistic';

interface Props {
  artist: SpotifyArtist;
}

export default function ArtistDrawerContent({ artist }: Props) {
  return (
    <Fragment>
      <article className="flex flex-col md:flex-row items-center">
        <Image
          width={208}
          height={208}
          src={artist.images[0].url}
          className="rounded-full"
          priority
          alt={`Artist image for ${artist.name}`}
        />
        <div className="mt-5 text-center md:text-left md:ml-5">
          <Heading level="h1">{artist.name}</Heading>
          {/* <Button
          variant="primary"
          buttonSize="small"
          hrefExternal={artist.external_urls.spotify}
        >
          Listen on Spotify
        </Button> */}
        </div>
      </article>
      <HeadlineStatistic
        label="Monthly Listeners"
        value={Number(artist.followers.total).toLocaleString()}
      />
    </Fragment>
  );
}
