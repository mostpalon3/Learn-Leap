import { useState } from 'react'
import { Link } from 'react-router-dom'
import menu from '../assets/menu.svg'
import Sidebar from '../components/Sidebar'

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  return (
    <div className="flex justify-between items-center p-5">
      <div>
        <Link to="/">Logo</Link>
      </div>
      {/* Desktop view */}
      <div className="hidden md:flex gap-8 font-semibold">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/signin">Signin</Link>
      </div>
      {/* Mobile view */}
      <div className="flex md:hidden">
        <img src={menu} alt="" className="h-6" onClick={() => setSidebarOpen(true)} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}/>
      </div>
    </div>
  )
}

export default Navbar
