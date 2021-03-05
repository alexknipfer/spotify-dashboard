import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  url?: string;
  description?: string;
}

const Meta: React.FC<Props> = (customMeta) => {
  const router = useRouter();

  const meta = {
    title: 'Spotify Dashboard - The place to find your Spotify statistics.',
    description:
      'Find your most recent spotify music, top artists, top songs, and more!',
    image:
      'https://spotify-dashboard-alexknipfer.vercel.app/static/images/spotify_dashboard_card.jpg',
    type: 'website',
    ...customMeta,
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="og:title" content={meta.title} />
      <meta
        property="og:url"
        content={`https://spotify-dashboard-alexknipfer.vercel.app${router.asPath}`}
      />
      <link
        rel="canonical"
        href={`https://spotify-dashboard-alexknipfer.vercel.app${router.asPath}`}
      />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Spotify Dashboard" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@knipferalex" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Head>
  );
};

export default Meta;
