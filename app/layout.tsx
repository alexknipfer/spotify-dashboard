import './global.css';
import localFont from 'next/font/local';
import { Metadata } from 'next';

import { Providers } from './providers';

interface Props {
  children: React.ReactNode;
}

const circularStdFont = localFont({
  src: [
    {
      path: '../public/fonts/CircularStd-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/CircularStd-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Spotify Dashboard - The place to find your Spotify statistics.',
  description:
    'Find your most recent spotify music, top artists, top songs, and more!',
  themeColor: 'black',
  openGraph: {
    title: 'Spotify Dashboard - The place to find your Spotify statistics.',
    description:
      'Find your most recent spotify music, top artists, top songs, and more!',
    url: 'https://spotify-dashboard-alexknipfer.vercel.app',
    siteName: 'Spotify Dashboard',
    images: [
      {
        url: 'https://spotify-dashboard-alexknipfer.vercel.app/static/images/spotify_dashboard_card.jpg',
        width: 1223,
        height: 639,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    title: 'Lee Robinson',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/static/favicons/favicon.ico',
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={circularStdFont.className}>
      <Providers>
        <body className="bg-spotify-gray text-white">{children}</body>
      </Providers>
    </html>
  );
}
