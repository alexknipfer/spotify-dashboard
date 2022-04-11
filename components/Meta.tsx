import Head from 'next/head';

interface Props {
  title?: string;
  url?: string;
  description?: string;
}

const Meta = (customMeta: Props) => {
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
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      <meta name="description" content={meta.description} />
      <meta name="og:title" content={meta.title} />
      <meta
        property="og:url"
        content={`https://spotify-dashboard-alexknipfer.vercel.app`}
      />
      <link
        rel="canonical"
        href={`https://spotify-dashboard-alexknipfer.vercel.app`}
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
