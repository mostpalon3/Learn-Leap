import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  Clock, 
  FileText, 
  BookOpen, 
  HelpCircle, 
  Video, 
  ExternalLink, 
  ChevronLeft, 
  Play,
  Award,
  HeartHandshake,
  X,
  CheckCircle
} from "lucide-react";

const CourseDetail = () => {
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  const course = {
    title: "Introduction to React",
    description: "Learn the fundamentals of React, including components, state management, and more in this comprehensive course.",
    instructor: "Jane Doe",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.8,
    students: 1243,
    price: 49.99,
    scholarshipEligible: true,
    image: "/src/assets/images/profile-vector.png",
    topics: [
      { name: "React Basics", slug: "react-basics" },
      { name: "JSX and Components", slug: "jsx-and-components" },
      { name: "State and Props", slug: "state-and-props" },
      { name: "React Hooks", slug: "react-hooks" },
      { name: "Routing with React Router", slug: "react-router" },
    ],
    resources: [
      { name: "React Docs", link: "https://react.dev/" },
      { name: "React Router Guide", link: "https://reactrouter.com/" },
    ],
    quizzes: [
      { title: "React Basics Quiz", link: "/quiz" },
      { title: "Hooks & State Quiz", link: "/quiz" },
    ],
    videos: [
      { title: "React Crash Course", link: "https://youtu.be/w7ejDZ8SWv8" },
      { title: "React Hooks Explained", link: "https://youtu.be/dpw9EHDh2bM" },
    ],
  };

  const submitAuditRequest = (event) => {
    event.preventDefault();
    // This would typically send a request to the backend
    console.log("Audit request submitted");
    setAuditSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setAuditSubmitted(false);
      setShowAuditModal(false);
    }, 3000);
  };

  return (
    <div className="relative left-[15%] bg-[#f6fbf6] w-[85%] min-h-screen">
      {/* Course Header/Banner */}
      <div className="relative bg-[#28595a] text-white py-12 px-8">
        <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-full w-full">
            <circle cx="80" cy="20" r="15" fill="white" />
            <circle cx="20" cy="70" r="20" fill="white" />
            <circle cx="70" cy="70" r="10" fill="white" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <div className="flex items-center mb-4">
                <Link to="/courses" className="flex items-center text-[#dbf0dd] hover:text-white transition-colors">
                  <ChevronLeft size={16} className="mr-1" />
                  Back to Courses
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-[#dbf0dd] mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-6 mb-2">
                <div className="flex items-center">
                  <User size={18} className="mr-2 text-[#ff8400]" />
                  <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="mr-2 text-[#ff8400]" />
                  <span>Duration: {course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Award size={18} className="mr-2 text-[#ff8400]" />
                  <span>Level: {course.level}</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs">
                {course.scholarshipEligible && (
                  <div className="bg-[#dbf0dd] px-4 py-2 rounded-lg mb-4 flex items-center">
                    <HeartHandshake size={18} className="text-[#28595a] mr-2" />
                    <span className="text-sm text-[#28595a] font-medium">Scholarship Eligible</span>
                  </div>
                )}
                <div className="bg-[#dbf0dd] h-40 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen size={64} className="text-[#28595a] opacity-50" />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-[#28595a]">${course.price}</span>
                  <div className="flex items-center">
                    <span className="bg-[#dbf0dd] text-[#28595a] px-2 py-1 rounded-full text-sm font-medium">
                      {course.rating} ★
                    </span>
                  </div>
                </div>
                <button className="w-full bg-[#ff8400] hover:bg-[#e67700] text-white font-medium py-3 px-4 rounded-lg transition-colors mb-3">
                  Enroll Now
                </button>
                {course.scholarshipEligible && (
                  <button 
                    onClick={() => setShowAuditModal(true)}
                    className="w-full flex items-center justify-center border border-[#28595a] text-[#28595a] hover:bg-[#28595a] hover:text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <HeartHandshake size={16} className="mr-2" />
                    Request Audit Access
                  </button>
                )}
                <p className="text-center text-sm text-gray-500 mt-3">
                  {course.students.toLocaleString()} students enrolled
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Info Banner */}
      {course.scholarshipEligible && (
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="bg-[#dbf0dd] border-l-4 border-[#28595a] rounded-lg p-4">
            <div className="flex items-start">
              <HeartHandshake className="text-[#28595a] mt-1 mr-3 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-[#28595a] mb-1">Financial Assistance Available</h3>
                <p className="text-gray-700">
                  This course is eligible for our Audit Access program for disadvantaged students.
                  You'll have access to all course materials, but may have limited access to assessments and certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Topics Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-[#dbf0dd] px-6 py-4">
              <h2 className="text-xl font-bold text-[#28595a] flex items-center">
                <FileText size={20} className="mr-2" />
                Course Modules
              </h2>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-100">
                {course.topics.map((topic, index) => (
                  <li key={index} className="py-3 first:pt-0 last:pb-0">
                    <Link 
                      to={`/topics/${topic.slug}`} 
                      className="flex items-start group hover:bg-[#f0f8f0] p-2 rounded-lg transition-colors"
                    >
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#28595a] text-white text-sm mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <span className="text-gray-800 group-hover:text-[#28595a] font-medium transition-colors">{topic.name}</span>
                        <p className="text-sm text-gray-500 mt-1">Learn the core concepts and implement examples</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-[#dbf0dd] px-6 py-4">
              <h2 className="text-xl font-bold text-[#28595a] flex items-center">
                <BookOpen size={20} className="mr-2" />
                Resources
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4 mb-8">
                {course.resources.map((res, index) => (
                  <li key={index} className="group">
                    <a 
                      href={res.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-[#28595a] hover:bg-[#f0f8f0] transition-all"
                    >
                      <ExternalLink size={18} className="text-[#28595a] mr-3" />
                      <span className="text-gray-700 group-hover:text-[#28595a] font-medium">{res.name}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4">
                <HelpCircle size={18} className="text-[#28595a] mr-2" />
                Assessment Quizzes
              </h3>
              <ul className="space-y-4">
                {course.quizzes.map((quiz, index) => (
                  <li key={index} className="group">
                    <Link 
                      to={quiz.link} 
                      className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-[#28595a] hover:bg-[#f0f8f0] transition-all"
                    >
                      <div className="w-8 h-8 bg-[#dbf0dd] rounded-full flex items-center justify-center text-[#28595a] mr-3">
                        Q
                      </div>
                      <span className="text-gray-700 group-hover:text-[#28595a] font-medium">{quiz.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Video Lectures Section */}
        <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-[#dbf0dd] px-6 py-4">
            <h2 className="text-xl font-bold text-[#28595a] flex items-center">
              <Video size={20} className="mr-2" />
              Video Lectures
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.videos.map((vid, index) => (
                <div key={index} className="group relative">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-800 opacity-40 group-hover:opacity-50 transition-opacity"></div>
                    <Play size={48} className="text-white relative z-10" />
                  </div>
                  <div className="mt-3">
                    <a 
                      href={vid.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#28595a] font-medium group-hover:text-[#ff8400] transition-colors flex items-center"
                    >
                      {vid.title}
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Progress Section */}
        <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div className="bg-[#28595a] h-4 rounded-full" style={{ width: '25%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>25% Complete</span>
              <span>1/4 Modules</span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Link 
                to="/courses" 
                className="inline-flex items-center px-4 py-2 border border-[#28595a] text-[#28595a] hover:bg-[#28595a] hover:text-white font-medium rounded-lg transition-colors"
              >
                <ChevronLeft size={18} className="mr-1" />
                Back to Courses
              </Link>
              
              <Link 
                to={`/topics/${course.topics[0].slug}`} 
                className="inline-flex items-center px-6 py-2 bg-[#ff8400] hover:bg-[#e67700] text-white font-medium rounded-lg transition-colors"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Access Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-[#28595a] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-xl font-bold">Request Audit Access</h3>
              <button onClick={() => setShowAuditModal(false)} className="text-white hover:text-[#ff8400]">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {!auditSubmitted ? (
                <>
                  <p className="mb-4 text-gray-700">
                    Our Audit Access program is designed for disadvantaged students who face financial barriers. 
                    Please provide some information to help us assess your eligibility.
                  </p>
                  <form onSubmit={submitAuditRequest}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Why are you requesting audit access?</label>
                      <textarea 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28595a]"
                        rows="4"
                        placeholder="Please explain your current situation and why you need financial assistance..."
                        required
                      ></textarea>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Current educational/employment status</label>
                      <select 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28595a]"
                        required
                      >
                        <option value="">Select your status</option>
                        <option value="student">Student</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="employed-low-income">Employed (Low Income)</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-2" required />
                        <span className="text-sm text-gray-700">
                          I confirm that the information provided is accurate and I understand that providing false information may result in losing access to the course.
                        </span>
                      </label>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button 
                        type="button"
                        onClick={() => setShowAuditModal(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-[#ff8400] hover:bg-[#e67700] text-white font-medium rounded-lg"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#dbf0dd] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-[#28595a]" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#28595a]">Request Submitted!</h3>
                  <p className="text-gray-700">
                    Thank you for your request. Our team will review your application and contact you within 48 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;