// import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet,useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import FloatingChatbot from '../components/floatingChatbot';

function Layout() {
  const location = useLocation();
  return (
    <div>
      {/* <Navbar /> */}
      <Sidebar />
      {<Outlet />}
      {location.pathname !== "/profile" && location.pathname !== "/courses" && location.pathname !== "/chat"  && location.pathname !== "/pdf-to-quiz" && <Footer />}
      <FloatingChatbot />
    </div>
  )
}

export default Layout
