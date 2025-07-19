
import { httpClient } from '@/lib/http-client';

import type { MoviesResponse } from '@/types/movie';

export async function searchMovies(query: string, page = 1): Promise<MoviesResponse> {
  const { data } = await httpClient.get<MoviesResponse>('/search/movie', {
    params: {
      query: query.trim(),
      page,
    },
  });

  return data;
}
