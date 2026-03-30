import { Outlet } from 'react-router-dom'
import MainLayout from './MainLayout'

function Layout(){
    return (
       <MainLayout>
         <Outlet />
       </MainLayout>
    )
}

export default Layout