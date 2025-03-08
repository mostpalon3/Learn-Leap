import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen">
      <div className="px-10">
        <section className="h-screen flex items-center justify-center">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              404 - Page Not Found
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Sorry, the page you are looking for does not exist.
            </p>
            <button className="bg-black px-4 py-2 text-white rounded-md font-semibold">
              
              <Link to="/">
                Go Back Home
              </Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default NotFound
