module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
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
    ],
  },
};
