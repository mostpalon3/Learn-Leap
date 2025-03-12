import { Link } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";

function Sidebar({ open, setOpen }) {
  const [user, setUser] = useState(null);

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
            {user ? (<button onClick={handleLogout} className="cursor-pointer">Logout</button>) :(<Link to="/login">Login</Link>)}
        </div>
      </aside>
    )
}

export default Sidebar
