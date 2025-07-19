import { useQuery } from '@tanstack/react-query';

import * as MovieApiService from '@/api/movie.service';


export function useMovieSearch(query: string, page = 1) {
  return useQuery({
    queryKey: ["movies", { search: query, page }],
    queryFn: () => MovieApiService.searchMovies(query, page),
  });
}

