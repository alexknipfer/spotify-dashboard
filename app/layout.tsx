import './global.css';
import { Inter as FontSans } from 'next/font/google';
import { Metadata, Viewport } from 'next';

import { Providers } from './providers';

import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://spotify-dashboard-alexknipfer.vercel.app'),
  title: 'Spotify Dashboard - The place to find your Spotify statistics.',
  description:
    'Find your most recent spotify music, top artists, top songs, and more!',
  openGraph: {
    title: 'Spotify Dashboard - The place to find your Spotify statistics.',
    description:
      'Find your most recent spotify music, top artists, top songs, and more!',
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

export const viewport: Viewport = {
  themeColor: 'black',
};

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
    >
      <Providers>
        <body className="bg-zinc-950 text-white">{children}</body>
      </Providers>
    </html>
  );
}
