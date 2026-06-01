import { useNavigate } from 'react-router-dom'
import type { Movie } from '@/types/movie'
import { getImageUrl } from '@/api/movies'
import { ROUTES } from '@/constants/routes'

interface MovieCardProps {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      className="bg-white rounded-lg overflow-hidden cursor-pointer shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-md"
      onClick={() => navigate(ROUTES.movieDetail(movie.id))}
    >
      <div className="aspect-[2/3] bg-gray-200">
        {getImageUrl(movie.poster_path) ? (
          <img
            src={getImageUrl(movie.poster_path)!}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm truncate">{movie.title}</h3>
        <p className="text-gray-500 text-xs mt-1">{movie.release_date}</p>
        <p className="text-gray-500 text-xs mt-2 line-clamp-3">{movie.overview || '줄거리 없음'}</p>
      </div>
    </div>
  )
}

export default MovieCard