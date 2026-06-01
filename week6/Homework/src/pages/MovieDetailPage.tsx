import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getImageUrl } from '@/api/movies'
import { ROUTES } from '@/constants/routes'
import { useGuestSession } from '@/hooks/useGuestSession'
import { useMovieDetail } from '@/hooks/useMovieDetail'
import { useMovieRating } from '@/hooks/useMovieRating'

const formatCurrency = (value: number) =>
  value > 0 ? `US$${value.toLocaleString()}` : '정보 없음'

const formatRuntime = (minutes: number | null) => {
  if (!minutes) return '정보 없음'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}시간 ${m}분` : `${m}분`
}

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const movieId = Number(id)

  const guestSessionId = useGuestSession()
  const { data: movie, isLoading, isError } = useMovieDetail(movieId)
  const { currentRating, saveRating, removeRating, message, setMessage } = useMovieRating({
    movieId,
    guestSessionId,
  })

  const [ratingInput, setRatingInput] = useState('')

  useEffect(() => {
    if (currentRating !== undefined) {
      setRatingInput(String(currentRating))
    }
  }, [currentRating])

  if (!Number.isFinite(movieId)) {
    navigate(ROUTES.HOME)
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    )
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">영화 정보를 불러올 수 없습니다.</p>
      </div>
    )
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original')
  const posterUrl = getImageUrl(movie.poster_path)

  const handleSave = () => {
    const value = parseFloat(ratingInput)
    if (isNaN(value)) {
      setMessage('숫자를 입력해주세요.')
      return
    }
    saveRating(value)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {backdropUrl && (
        <div className="relative h-72 overflow-hidden">
          <img src={backdropUrl} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="text-gray-500 hover:text-gray-900 text-sm mb-6 flex items-center gap-1 transition-colors"
        >
          ← 목록으로 돌아가기
        </button>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {posterUrl && (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-44 rounded-lg flex-shrink-0 self-start mx-auto md:mx-0 shadow"
            />
          )}

          <div className="flex-1">
            <p className="text-gray-500 text-sm mb-1">{movie.release_date}</p>
            <h1 className="text-3xl font-bold mb-3">{movie.title}</h1>

            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">평점</p>
                <p className="font-semibold">{movie.vote_average.toFixed(1)} / 10</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">투표 수</p>
                <p className="font-semibold">{movie.vote_count.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">상영 시간</p>
                <p className="font-semibold">{formatRuntime(movie.runtime)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">상태</p>
                <p className="font-semibold">{movie.status}</p>
              </div>
            </div>
          </div>
        </div>

        {movie.overview && (
          <section className="bg-white rounded-xl p-6 shadow-sm mb-4">
            <h2 className="font-semibold text-lg mb-3">줄거리</h2>
            <p className="text-gray-600 leading-relaxed">{movie.overview}</p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">기본 정보</h2>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {[
                  ['원제', movie.original_title],
                  ['원어', movie.original_language],
                  [
                    '제작 국가',
                    movie.production_countries.map((c) => c.name).join(', ') || '정보 없음',
                  ],
                  [
                    '사용 언어',
                    movie.spoken_languages.map((l) => l.english_name).join(', ') || '정보 없음',
                  ],
                  ['예산', formatCurrency(movie.budget)],
                  ['수익', formatCurrency(movie.revenue)],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="py-2 text-gray-500 w-28">{label}</td>
                    <td className="py-2 font-medium">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-1">별점 남기기</h2>
            <p className="text-gray-400 text-sm mb-3">0.5 - 10.0</p>
            <input
              type="number"
              min={0.5}
              max={10}
              step={0.5}
              value={ratingInput}
              onChange={(e) => setRatingInput(e.target.value)}
              placeholder="별점 입력"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                별점 저장
              </button>
              <button
                onClick={removeRating}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                별점 삭제하기
              </button>
            </div>
            {message && (
              <p className="text-sm text-green-600 mt-3">{message}</p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage