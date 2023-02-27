module.exports = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: [
      'i.scdn.co',
      'mosaic.scdn.co',
      'lineup-images.scdn.co',
      'daily-mix.scdn.co',
      't.scdn.co',
      'dailymix-images.scdn.co',
      'newjams-images.scdn.co',
      'seeded-session-images.scdn.co',
      'seed-mix-image.spotifycdn.com',
    ],
  },
};
