import { Link } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Sidebar({ open, setOpen }) {
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  
  // set visible to false if url is /sigup, /login, /chat, /quiz
  useEffect(() => {
    if (location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/chat' || location.pathname === '/quiz') {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success('Logout successful!')
  };
    return (
  //theme #CAE0BC
      <aside className={`left-0 top-0 w-64 h-full bg-[#dbf0dd] backdrop-blur-lg fixed shadow-lg z-10 ${visible?'block':'hidden'}`}>
        <button className="absolute top-5 left-5" onClick={() => setOpen(false)}>
            {"X"}
        </button>
        <div className="text-center flex flex-col items-center justify-center h-full gap-8">
            <Link to="/about">About</Link>
            <Link to="/courses">Courses</Link>
            {user ? (
              <>
              <Link to="/feed">Feed</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="cursor-pointer">Logout</button>
              </>
              ) :(
                <>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              </>
              )}
        </div>
      </aside>
    )
}

export default Sidebar
