import { Link } from "react-router-dom"

function Sidebar({ open, setOpen }) {
    const isLoggedIn = false
    // if (open=true)
    return (
  //theme #CAE0BC
      <aside className="left-0 top-0 w-64 h-full bg-[#dbf0dd] backdrop-blur-lg fixed shadow-lg z-10">
        <button className="absolute top-5 left-5" onClick={() => setOpen(false)}>
            {"X"}
        </button>
        <div className="text-center flex flex-col items-center justify-center h-full gap-8">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/feed">Feed</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signin</Link>
            {/* {isLoggedIn ? (
            <Link to="/profile">Profile</Link>
            ) : (
            <Link to="/login">Login</Link>
            )} */}
        </div>
      </aside>
    )
}

export default Sidebar
