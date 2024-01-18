const base = '/dashboard';

export const DashboardRoutes = {
  base: {
    template: base,
    name: 'Dashboard',
  },
  recent: {
    template: `${base}/recent`,
    name: 'Recent',
  },
  playlists: {
    template: `${base}/playlists`,
    name: 'Playlists',
    make: ({ playlistId }: { playlistId: string }) => {
      console.warn('make!!!!');

      return `${DashboardRoutes.playlists.template}/${playlistId}`;
    },
  },
  artists: {
    template: `${base}/artists`,
    name: 'Artists',
  },
  tracks: {
    template: `${base}/tracks`,
    name: 'Tracks',
  },
  track: {
    template: `${base}/track`,
    name: 'Track',
    make: ({ trackId }: { trackId: string }) =>
      `${DashboardRoutes.track.template}/${trackId}`,
  },
};

export const NavigationHeaderRoutes = [
  DashboardRoutes.base,
  DashboardRoutes.tracks,
  DashboardRoutes.artists,
  DashboardRoutes.playlists,
  DashboardRoutes.recent,
];
