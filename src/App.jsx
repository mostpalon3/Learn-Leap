import { useEffect, useState } from "react";
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import NotFound from './pages/NotFound'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import Layout from './layouts/Layout'
import { auth } from "../config/firebase";
import { onAuthStateChanged} from "firebase/auth";
import CourseDetail from "./components/CourseDetail";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/profile"); 
      } else {
        navigate("/"); 
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 ">
      <Routes path="/" element={<Layout />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/introduction-to-react" element={<CourseDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
