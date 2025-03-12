import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import form from '../assets/form.svg'
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    console.log(email, password)

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
    } catch (err) {
      console.error(err);
    }

    toast.success('Login successful!')
    setEmail('')
    setPassword('')
    navigate('/')
  }

  return (
    <section className="h-screen flex items-center justify-center p-5">
      <div className="mx-auto text-center md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
          Login to Your Account
        </h1>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            className="bg-black px-4 py-2 text-white rounded-md font-semibold w-full mb-2"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-600 underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
      <div className='w-1/2 hidden md:block'>
        <img src={form} alt="" className='mx-auto'/>
      </div>
    </section>
  )
}

export default Login;
