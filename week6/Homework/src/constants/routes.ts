export const ROUTES = {
  HOME: '/',
  MOVIE_DETAIL: '/movie/:id',
  movieDetail: (id: number) => `/movie/${id}`,
} as const