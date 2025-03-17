// import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet,useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function Layout() {
  const location = useLocation();
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Sidebar /> */}
      {<Outlet />}
      {location.pathname !== "/profile" || location.pathname !== "/courses" && <Footer />}
    </div>
  )
}

export default Layout
