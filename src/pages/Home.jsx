import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import profileVector from '../assets/images/profile-vector.png';

function Home() {
  const { user } = useAuth();

  return (
    <div className="relative left-[15%] bg-[#f6fbf6] w-[85%] min-h-screen">
      {/* Hero Section */}
      <section className="px-8 pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#28595a] rounded-bl-[100px] -z-10 opacity-90"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Learning Journey with <span className="text-[#ff8400]">Learn Leap</span>
              </h1>
              <p className="text-lg mb-8 text-gray-700 max-w-lg">
                Interactive courses, personalized learning paths, and AI-powered tools to help you master new skills at your own pace.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Link to="/courses" className="px-8 py-3 bg-[#ff8400] text-white font-semibold rounded-lg shadow-lg hover:bg-[#e67700] transition-all">
                    Explore Courses
                  </Link>
                ) : (
                  <Link to="/signup" className="px-8 py-3 bg-[#ff8400] text-white font-semibold rounded-lg shadow-lg hover:bg-[#e67700] transition-all">
                    Get Started
                  </Link>
                )}
                <Link to="/about" className="px-8 py-3 border-2 border-[#28595a] text-[#28595a] font-semibold rounded-lg hover:bg-[#28595a] hover:text-white transition-all">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src={profileVector}
                alt="Learning illustration" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Makes Learn Leap Different</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-[#dbf0dd] rounded-xl p-8 shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#28595a] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Comprehensive Courses</h3>
              <p className="text-gray-700">
                From Web Development to Data Science, our courses cover a wide range of in-demand skills.
              </p>
            </div>
            
            <div className="bg-[#dbf0dd] rounded-xl p-8 shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#28595a] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Learning</h3>
              <p className="text-gray-700">
                Our AI Quiz Generator and chatbot provide personalized learning experiences.
              </p>
            </div>
            
            <div className="bg-[#dbf0dd] rounded-xl p-8 shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#28595a] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Community Learning</h3>
              <p className="text-gray-700">
                Connect with peers, share insights, and stay motivated with our interactive feed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Popular Courses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <div className="h-48 bg-[#28595a] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Introduction to React</h3>
                <p className="text-gray-600 mb-4">Learn the fundamentals of React, including components, state management, and more.</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>Instructor: Jane Doe</span>
                  <span className="mx-2">•</span>
                  <span>8 weeks</span>
                </div>
                <Link to="/courses/introduction-to-react" className="block text-center py-2 px-4 bg-[#ff8400] text-white rounded-lg font-medium hover:bg-[#e67700] transition-all">
                  View Course
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <div className="h-48 bg-[#28595a] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Data Analysis with Python</h3>
                <p className="text-gray-600 mb-4">Master data analysis techniques using Python and popular libraries.</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>Instructor: David Moore</span>
                  <span className="mx-2">•</span>
                  <span>10 weeks</span>
                </div>
                <Link to="/courses" className="block text-center py-2 px-4 bg-[#ff8400] text-white rounded-lg font-medium hover:bg-[#e67700] transition-all">
                  View Course
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <div className="h-48 bg-[#28595a] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Graphic Design Fundamentals</h3>
                <p className="text-gray-600 mb-4">Learn design principles and techniques with hands-on projects.</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>Instructor: Sophia Davis</span>
                  <span className="mx-2">•</span>
                  <span>6 weeks</span>
                </div>
                <Link to="/courses" className="block text-center py-2 px-4 bg-[#ff8400] text-white rounded-lg font-medium hover:bg-[#e67700] transition-all">
                  View Course
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/courses" className="inline-block py-3 px-8 bg-[#28595a] text-white font-semibold rounded-lg hover:bg-[#1e4445] transition-all">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 px-8 bg-[#dbf0dd]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Generate Quizzes From Any PDF</h2>
              <p className="text-lg mb-6 text-gray-700">
                Our AI-powered tool can analyze any PDF document and generate interactive quizzes to test your knowledge. Simply upload your study material and get instant practice questions.
              </p>
              <Link to="/pdf-to-quiz" className="inline-block py-3 px-8 bg-[#ff8400] text-white font-semibold rounded-lg hover:bg-[#e67700] transition-all">
                Try PDF Quiz Generator
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-xl">
                <div className="h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[#28595a] p-5 rounded-xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / CTA */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Ready to Leap Forward?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are advancing their careers with Learn Leap's interactive courses and cutting-edge learning tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link to="/courses" className="px-8 py-3 bg-[#ff8400] text-white font-semibold rounded-lg shadow-lg hover:bg-[#e67700] transition-all">
                Explore Courses
              </Link>
            ) : (
              <Link to="/signup" className="px-8 py-3 bg-[#ff8400] text-white font-semibold rounded-lg shadow-lg hover:bg-[#e67700] transition-all">
                Sign Up For Free
              </Link>
            )}
            <Link to="/about" className="px-8 py-3 border-2 border-[#28595a] text-[#28595a] font-semibold rounded-lg hover:bg-[#28595a] hover:text-white transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;