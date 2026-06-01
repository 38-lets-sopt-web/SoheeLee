export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface MovieDetail {
  id: number
  title: string
  original_title: string
  original_language: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  runtime: number | null
  status: string
  genres: { id: number; name: string }[]
  tagline: string
  production_countries: { iso_3166_1: string; name: string }[]
  spoken_languages: { english_name: string; name: string }[]
  budget: number
  revenue: number
}

export interface MovieListResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface GuestSession {
  guest_session_id: string
  expires_at: string
}

export interface RatedMovie extends Movie {
  rating: number
}

export interface RatedMoviesResponse {
  page: number
  results: RatedMovie[]
  total_pages: number
  total_results: number
}