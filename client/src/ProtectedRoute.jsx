import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

function ProtectedRoute () {
  const { loading, isAuthenticated } = useAuth()

  if (loading) return <h1 className='text-white text-2xl'>Loading...</h1>
  if (!loading && !isAuthenticated) return <Navigate to='/login' replace />

  return (
    <Outlet />
  )
}
export default ProtectedRoute
