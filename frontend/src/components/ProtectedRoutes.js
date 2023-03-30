import { Navigate, Outlet } from 'react-router-dom'
import authService from '../services/authService';

const ProtectedRoutes = () => {
    return (
        authService.isAuthenticated() ? <Outlet /> : <Navigate to ='/login' />
    )
}

export default ProtectedRoutes;