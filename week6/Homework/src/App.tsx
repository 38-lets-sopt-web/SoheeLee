import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import MovieDetailPage from './pages/MovieDetailPage'
import MovieListPage from './pages/MovieListPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<MovieListPage />} />
        <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App