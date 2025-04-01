import { Link } from "react-router-dom";

const CourseDetail = () => {
  const course = {
    title: "Introduction to React",
    description: "Learn the fundamentals of React, including components, state management, and more in this comprehensive course.",
    instructor: "Jane Doe",
    duration: "8 weeks",
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

  return (
    <div className="relative left-[15%] bg-[#f6fbf6] w-[85%] min-h-screen p-8">
      {/* Course Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
        <p className="text-gray-600 mt-2">{course.description}</p>
        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-gray-700">Instructor: {course.instructor}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700">Duration: {course.duration}</span>
          </div>
        </div>
      </div>

      {/* Course Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topics Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Topics
          </h2>
          <ul className="space-y-2">
            {course.topics.map((topic, index) => (
              <li key={index} className="group">
                <Link 
                  to={`/topics/${topic.slug}`} 
                  className="flex items-start p-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-500 mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-blue-600 group-hover:text-blue-700 font-medium">{topic.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Resources
          </h2>
          <ul className="space-y-3">
            {course.resources.map((res, index) => (
              <li key={index} className="group">
                <a 
                  href={res.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-blue-600 group-hover:text-blue-700 font-medium">{res.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quizzes Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Quizzes
          </h2>
          <ul className="space-y-3">
            {course.quizzes.map((quiz, index) => (
              <li key={index} className="group">
                <Link 
                  to={quiz.link} 
                  className="flex items-center p-3 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-blue-600 group-hover:text-blue-700 font-medium">{quiz.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Video Lectures Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Video Lectures
          </h2>
          <ul className="space-y-3">
            {course.videos.map((vid, index) => (
              <li key={index} className="group">
                <a 
                  href={vid.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-blue-600 group-hover:text-blue-700 font-medium">{vid.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Back to Courses button */}
      <div className="mt-8">
        <Link 
          to="/courses" 
          className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Courses
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;