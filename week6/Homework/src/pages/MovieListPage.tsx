import { useCallback, useEffect, useRef, useState } from 'react'
import MovieCard from '@/components/MovieCard'
import MovieFilter from '@/components/MovieFilter'
import { useMovies } from '@/hooks/useMovies'

const MovieListPage = () => {
  const [voteGte, setVoteGte] = useState<number | undefined>()
  const [voteLte, setVoteLte] = useState<number | undefined>()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useMovies({
    voteGte,
    voteLte,
  })

  const observerRef = useRef<HTMLDivElement | null>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  )

  useEffect(() => {
    const element = observerRef.current
    if (!element) return
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [handleObserver])

  const movies = data?.pages.flatMap((page) => page.results) ?? []

  const handleFilterChange = (newVoteGte?: number, newVoteLte?: number) => {
    setVoteGte(newVoteGte)
    setVoteLte(newVoteLte)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Movie Explorer</h1>
          <MovieFilter voteGte={voteGte} voteLte={voteLte} onChange={handleFilterChange} />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div ref={observerRef} className="h-10 mt-4 flex justify-center items-center">
              {isFetchingNextPage && <div className="text-gray-500 text-sm">불러오는 중...</div>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MovieListPage