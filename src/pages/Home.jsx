import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="px-10">
        <section className="h-screen flex items-center justify-center">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              AI Learning, <br />
              Personalized Success!
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join our AI-powered community to learn, share knowledge, collaborate, and achieve
             personalized success together!
            </p>
            <button className="bg-black px-4 py-2 text-white rounded-md font-semibold">
              Get Started
            </button>
          </div>
        </section>

        <div className="px-4 mx-auto py-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className=" hover:shadow-lg hover:scale-105 rounded shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">
                    Web Development
                  </h3>
                  <p className="mb-4">
                    Learn modern web development with hands-on projects
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">$49.99</span>
                    <button className="font-semibold">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '10K+', label: 'Students' },
                { number: '500+', label: 'Courses' },
                { number: '1M+', label: 'Learning Hours' },
                { number: '1K+', label: 'Educators' },
              ].map((stat, i) => (
                <div key={i} className="p-6 shadow rounded">
                  <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Community Says
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 shadow rounded">
                  <div>
                    <p className="mb-4">
                      This platform has transformed my learning journey.
                      The community support is incredible, and the courses are
                      top-notch.
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center mr-3">
                        J
                      </div>
                      <div>
                        <h4 className="font-semibold">John Doe</h4>
                        <p className="text-sm">Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
