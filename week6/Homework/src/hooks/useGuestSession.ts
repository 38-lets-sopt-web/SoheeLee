import { useEffect, useState } from 'react'
import { fetchGuestSession } from '@/api/movies'

const STORAGE_KEY = 'tmdb_guest_session_id'

export const useGuestSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem(STORAGE_KEY),
  )

  useEffect(() => {
    if (sessionId) return
    fetchGuestSession().then((session) => {
      localStorage.setItem(STORAGE_KEY, session.guest_session_id)
      setSessionId(session.guest_session_id)
    })
  }, [sessionId])

  return sessionId
}