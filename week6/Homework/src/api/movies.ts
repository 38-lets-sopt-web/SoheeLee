import type {
  GuestSession,
  MovieDetail,
  MovieListResponse,
  RatedMoviesResponse,
} from '@/types/movie'
import client from '@/api/client'

interface FetchMoviesParams {
  page: number
  voteGte?: number
  voteLte?: number
}

export const fetchMovies = async ({ page, voteGte, voteLte }: FetchMoviesParams): Promise<MovieListResponse> => {
  const { data } = await client.get<MovieListResponse>('/discover/movie', {
    params: {
      page,
      sort_by: 'popularity.desc',
      'vote_average.gte': voteGte,
      'vote_average.lte': voteLte,
    },
  })
  return data
}

export const fetchMovieDetail = async (id: number): Promise<MovieDetail> => {
  const { data } = await client.get<MovieDetail>(`/movie/${id}`)
  return data
}

export const fetchGuestSession = async (): Promise<GuestSession> => {
  const { data } = await client.get<GuestSession>('/authentication/guest_session/new')
  return data
}

export const fetchRatedMovies = async (guestSessionId: string): Promise<RatedMoviesResponse> => {
  const { data } = await client.get<RatedMoviesResponse>(
    `/guest_session/${guestSessionId}/rated/movies`,
  )
  return data
}

export const rateMovie = async (
  movieId: number,
  rating: number,
  guestSessionId: string,
): Promise<void> => {
  await client.post(
    `/movie/${movieId}/rating`,
    { value: rating },
    { params: { guest_session_id: guestSessionId } },
  )
}

export const deleteMovieRating = async (
  movieId: number,
  guestSessionId: string,
): Promise<void> => {
  await client.delete(`/movie/${movieId}/rating`, {
    params: { guest_session_id: guestSessionId },
  })
}

export const getImageUrl = (path: string | null, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null
