// import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function Layout() {
  return (
    <div>
      {/* <Navbar /> */}
      <Sidebar />
      {<Outlet />}
      <Footer />
    </div>
  )
}

export default Layout
