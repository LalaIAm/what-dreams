import { Outlet, Navigate } from 'react-router-dom';
import { useGetUser } from '../hooks';



const Layout = () => {
    const [{ user }] = useGetUser()
    if (!user) {
        return <Navigate to='/' />
    }
    return (
        <div className='page layout-page'>
            <Outlet />
        </div>
    )
}

export default Layout