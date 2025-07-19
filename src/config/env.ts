export const env = {
  TMDB_API_KEY: import.meta.env.VITE_TMDB_API_KEY,
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
} as const;

if (!env.TMDB_API_KEY) {
  throw new Error('VITE_API_KEY_MOVIE_DB is required but not provided');
}
