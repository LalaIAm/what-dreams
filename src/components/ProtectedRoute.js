import { Navigate } from 'react-router-dom' 
import { useGetUser } from '../hooks'

const ProtectedRoute = ({ children }) => {
    const [{ user }] = useGetUser()
    
    if (!user) {
        return <Navigate to='/' />
    }
    return children
}

export default ProtectedRoute