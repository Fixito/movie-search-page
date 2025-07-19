import axios from 'axios';

import { env } from '@/config/env';

/**
 * HTTP client configuration
 */
export const httpClient = axios.create({
  baseURL: env.TMDB_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${env.TMDB_API_KEY}`,
  },
});
