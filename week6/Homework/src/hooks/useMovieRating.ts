import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteMovieRating, fetchRatedMovies, rateMovie } from '@/api/movies'

interface UseMovieRatingParams {
  movieId: number
  guestSessionId: string | null
}

export const useMovieRating = ({ movieId, guestSessionId }: UseMovieRatingParams) => {
  const queryClient = useQueryClient()
  const [message, setMessage] = useState<string | null>(null)

  const { data: ratedMovies } = useQuery({
    queryKey: ['ratedMovies', guestSessionId],
    queryFn: () => fetchRatedMovies(guestSessionId!),
    enabled: !!guestSessionId,
  })

  const currentRating = ratedMovies?.results.find((m) => m.id === movieId)?.rating

  const saveRating = async (rating: number) => {
    if (!guestSessionId) return
    if (rating < 0.5 || rating > 10) {
      setMessage('별점은 0.5 ~ 10.0 사이로 입력해주세요.')
      return
    }
    try {
      await rateMovie(movieId, rating, guestSessionId)
      await queryClient.invalidateQueries({ queryKey: ['ratedMovies', guestSessionId] })
      setMessage('별점이 저장되었습니다!')
    } catch {
      setMessage('저장에 실패했습니다.')
    }
  }

  const removeRating = async () => {
    if (!guestSessionId) return
    try {
      await deleteMovieRating(movieId, guestSessionId)
      await queryClient.invalidateQueries({ queryKey: ['ratedMovies', guestSessionId] })
      setMessage('별점이 삭제되었습니다.')
    } catch {
      setMessage('삭제에 실패했습니다.')
    }
  }

  return { currentRating, saveRating, removeRating, message, setMessage }
}