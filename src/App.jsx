import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import Quiz from './pages/Quiz'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signin from './pages/Signin'
import { ToastContainer } from 'react-toastify'
import Layout from './layouts/Layout'

function App() {
  return (
    <div className="min-h-screen bg-zinc-100 font-varela">
      <Routes path="/" element={<Layout />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/quiz" element={<Quiz />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
