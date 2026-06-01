import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchMovies } from '@/api/movies'

interface UseMoviesParams {
  voteGte?: number
  voteLte?: number
}

export const useMovies = ({ voteGte, voteLte }: UseMoviesParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['movies', voteGte, voteLte],
    queryFn: ({ pageParam }) => fetchMovies({ page: pageParam, voteGte, voteLte }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  })
}