import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { checkAuthAsync, selectUserChecked } from '../redux/Slices/Auth/authSlice'

const ProtectedRoute = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUserChecked)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			await dispatch(checkAuthAsync())
			setLoading(false)
		}
		checkAuth()
	}, [dispatch])

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-secondary"></div>
			</div>
		)
	}

	if (!user) {
		return <Navigate to="/signin" replace />
	}

	return <Outlet />
}

export default ProtectedRoute
