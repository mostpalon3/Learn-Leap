import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <main className="min-h-screen w-full">
      <section
        className="h-screen flex items-center justify-center"
        aria-label="About Us Section"
      >
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-primary">
            About Us
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-700">
            Discover our mission, vision, and the passionate team driving our community forward.
          </p>
          <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md bg-black hover:bg-primary-dark transition duration-300">
            Learn More
          </button>
        </motion.div>
      </section>
    </main>
  )
}

export default About
