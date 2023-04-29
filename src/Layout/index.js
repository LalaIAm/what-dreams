import { Outlet  } from 'react-router-dom';



const Layout = () => {
   
    
    return (
        <div className='page layout-page'>
            <Outlet />
        </div>
    )
}

export default Layout