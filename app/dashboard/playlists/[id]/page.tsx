import { Fragment } from 'react';

import PlaylistDetails from '@/components/PlaylistDetails';
import { spotifyService } from '@/lib/spotifyService';

interface Props {
  params: { id: string };
}

export const revalidate = 60;

export default async function Playlist({ params }: Props) {
  const playlist = await spotifyService.getPlaylistById(params.id);

  return (
    <Fragment>
      <PlaylistDetails playlist={playlist} />
    </Fragment>
  );
}
