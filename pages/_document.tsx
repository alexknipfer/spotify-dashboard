import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/CircularStd-Book.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/CircularStd-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="rgb(24, 24, 24)" />
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Find your most recent spotify music, top artists, top songs, and more!"
          />
          <meta
            name="og:title"
            content="Spotify Dashboard - The place to find your Spotify statistics."
          />
          <meta
            property="og:url"
            content={`https://spotify-dashboard-alexknipfer.vercel.app`}
          />
          <link
            rel="canonical"
            href={`https://spotify-dashboard-alexknipfer.vercel.app`}
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Spotify Dashboard" />
          <meta
            property="og:description"
            content="Find your most recent spotify music, top artists, top songs, and more!"
          />
          <meta
            property="og:title"
            content="Spotify Dashboard - The place to find your Spotify statistics."
          />
          <meta
            property="og:image"
            content="https://spotify-dashboard-alexknipfer.vercel.app/static/images/spotify_dashboard_card.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@knipferalex" />
          <meta
            name="twitter:title"
            content="Spotify Dashboard - The place to find your Spotify statistics."
          />
          <meta
            name="twitter:description"
            content="Find your most recent spotify music, top artists, top songs, and more!"
          />
          <meta
            name="twitter:image"
            content="https://spotify-dashboard-alexknipfer.vercel.app/static/images/spotify_dashboard_card.jpg"
          />
        </Head>
        <body className="bg-spotify-gray text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
