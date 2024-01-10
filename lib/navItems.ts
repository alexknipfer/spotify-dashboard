import { RoutePath } from '@/models/RoutePath.enum';

export const navItems = {
  [RoutePath.DASHBOARD]: {
    name: 'Dashboard',
  },
  [RoutePath.TRACKS]: {
    name: 'Top Tracks',
  },
  [RoutePath.ARTISTS]: {
    name: 'Top Artists',
  },
  [RoutePath.RECENT]: {
    name: 'Recent',
  },
};
