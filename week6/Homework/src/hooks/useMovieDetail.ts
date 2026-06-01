import { useQuery } from '@tanstack/react-query'
import { fetchMovieDetail } from '@/api/movies'

export const useMovieDetail = (id: number) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetail(id),
    enabled: Number.isFinite(id),
  })
}