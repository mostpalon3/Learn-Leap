import React from 'react';
import { Link } from 'react-router-dom';

//images
import profileVector from '../assets/images/profile-vector.png';
import aryanImage from '../assets/images/team/aryan.jpeg';
import sumitImage from '../assets/images/team/sumit.jpeg';
import deepeshImage from '../assets/images/team/deepesh.jpeg';
import shivamImage from '../assets/images/team/shivam.jpeg';

function About() {
  // Team members data with imported images
  const teamMembers = [
    {
      name: "Aryan Baibaswata",
      role: "Team Leader & AI/ML Developer",
      bio: "Passionate about using AI to enhance educational experiences.",
      image: aryanImage
    },
    {
      name: "Sumit Sagar",
      role: "Full Stack Developer & UI/UX Designer",
      bio: "Expert in creating user-friendly interfaces and seamless user experiences.",
      image: sumitImage
    },
    {
      name: "Deepesh",
      role: "Mern Stack Developer & ML Developer",
      bio: "AI expert specializing in educational technology and adaptive learning systems.",
      image: deepeshImage
    },
    {
      name: "Shivam Chauhan",
      role: "AI/ML Developer",
      bio: "Focused on developing AI algorithms for personalized learning.",
      image: shivamImage
    }
  ];

  return (
    <div className="relative left-[15%] bg-[#f6fbf6] w-[85%] min-h-screen">
      {/* Header section */}
      <section className="px-8 pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#28595a] rounded-bl-[100px] -z-10 opacity-90"></div>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              About <span className="text-[#ff8400]">Learn Leap</span>
            </h1>
            <p className="text-lg mb-8 text-gray-700 max-w-2xl">
              We're on a mission to transform education through innovative technology and personalized learning experiences. Learn Leap combines AI-powered tools with expert-crafted content to help learners achieve their goals.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#28595a]">Our Story</h2>
              <p className="text-gray-700 mb-4">
              Learn Leap was conceived for the 2025 AI-Humanity Hackathon, hosted by the IIF Society of NSUT. Our team united with a shared vision to revolutionize educational technology
              </p>
              <p className="text-gray-700 mb-4">
                We identified that traditional online learning platforms often lack engagement and personalization, resulting in limited effectiveness. Our solution leverages AI technology to transform how students interact with educational content, especially focusing on converting static PDFs into interactive quizzes.
              </p>
              <p className="text-gray-700">
                What started as a hackathon project has evolved into a comprehensive learning platform designed to make education more accessible, engaging, and effective for learners of all backgrounds and abilities.
              </p>
            </div>
            <div className="relative">
              <div className="bg-[#dbf0dd] rounded-lg p-6 md:p-10 shadow-xl">
                <img 
                  src={profileVector}
                  alt="Learn Leap Team" 
                  className="w-full h-auto rounded-lg" 
                />
                <div className="absolute -bottom-5 -right-5 bg-[#28595a] text-white p-4 rounded-lg shadow-lg">
                  <p className="font-bold">AI-Humanity Hackathon 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-t-4 border-[#ff8400]">
              <div className="w-16 h-16 bg-[#dbf0dd] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#28595a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Accessible Education</h3>
              <p className="text-gray-700">
                We believe quality education should be accessible to everyone, regardless of location, background, or prior experience.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-t-4 border-[#ff8400]">
              <div className="w-16 h-16 bg-[#dbf0dd] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#28595a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-700">
                We continuously explore new technologies and methodologies to improve the learning experience and deliver better outcomes.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-t-4 border-[#ff8400]">
              <div className="w-16 h-16 bg-[#dbf0dd] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#28595a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-700">
                Learning is a social experience. We foster supportive communities where learners can collaborate, share insights, and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 px-8 bg-[#dbf0dd]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What Makes Learn Leap Different</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="w-8 h-8 bg-[#28595a] text-white rounded-full flex items-center justify-center mr-3">1</span>
                  AI-Powered Learning
                </h3>
                <p className="text-gray-700 ml-11">
                  Our platform uses advanced AI to adapt to your learning style, identify knowledge gaps, and provide personalized learning paths.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="w-8 h-8 bg-[#28595a] text-white rounded-full flex items-center justify-center mr-3">2</span>
                  Interactive Content
                </h3>
                <p className="text-gray-700 ml-11">
                  Learn by doing with hands-on projects, quizzes, and interactive exercises that reinforce key concepts.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="w-8 h-8 bg-[#28595a] text-white rounded-full flex items-center justify-center mr-3">3</span>
                  PDF-to-Quiz Generator
                </h3>
                <p className="text-gray-700 ml-11">
                  Our revolutionary tool transforms any PDF document into interactive quizzes, making study materials more engaging and effective.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="w-8 h-8 bg-[#28595a] text-white rounded-full flex items-center justify-center mr-3">4</span>
                  Expert Instructors
                </h3>
                <p className="text-gray-700 ml-11">
                  Learn from industry professionals who bring real-world experience and insights to every course.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[#ff8400] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">AI Quiz Generator</h4>
                <p className="text-sm text-gray-600">Transform any PDF into interactive quizzes</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <div className="w-12 h-12 bg-[#ff8400] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Flexible Learning</h4>
                <p className="text-sm text-gray-600">Learn at your own pace with on-demand courses</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[#ff8400] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Community Feed</h4>
                <p className="text-sm text-gray-600">Share insights and learn from peers</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <div className="w-12 h-12 bg-[#ff8400] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Progress Tracking</h4>
                <p className="text-sm text-gray-600">Monitor your development with detailed analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="h-48 bg-[#28595a] flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-48 object-cover" 
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-[#ff8400] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/CTA */}
      <section className="py-16 px-8 bg-[#28595a] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are mastering new skills and advancing their careers with Learn Leap.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-8 py-3 bg-[#ff8400] text-white font-semibold rounded-lg shadow-lg hover:bg-[#e67700] transition-all">
              Get Started Today
            </Link>
            <Link to="/contact" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#28595a] transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
