import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen w-full">
      <section className="h-screen flex items-center justify-center">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            About Us
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Learn more about our mission, vision, and the team behind our
            community.
          </p>
        </div>
      </section>
    </div>
  )
}

export default About
