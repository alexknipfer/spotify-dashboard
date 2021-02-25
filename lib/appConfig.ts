function loadServerEnvVar(key: string) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is required on server`);
  }

  return value;
}

export const appConfig = {
  spotify: {
    clientId: loadServerEnvVar('SPOTIFY_CLIENT_ID'),
    clientSecret: loadServerEnvVar('SPOTIFY_CLIENT_SECRET'),
  },
};

export type AppConfig = typeof appConfig;
