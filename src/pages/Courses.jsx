import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();

  const [courses] = useState([
    { id: 1, title: 'Introduction to React', instructor: 'John Doe', category: 'Web Development', rating: 4.5, students: 1200, price: 49.99 },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith', category: 'Programming', rating: 4.8, students: 980, price: 59.99 },
    { id: 3, title: 'Machine Learning Basics', instructor: 'Alex Johnson', category: 'Data Science', rating: 4.6, students: 1500, price: 69.99 },
    { id: 4, title: 'UI/UX Design Principles', instructor: 'Emily Brown', category: 'Design', rating: 4.7, students: 850, price: 54.99 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Programming', 'Data Science', 'Design'];

  const filteredCourses = courses.filter(course => 
    (selectedCategory === 'All' || course.category === selectedCategory) &&
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (courseTitle) => {
    const formattedTitle = courseTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/courses/${formattedTitle}`);
  };

  return (
    <div className="mx-auto px-5 space-y-8 h-screen flex flex-col relative left-[7.5%] bg-[#f6fbf6] w-[85%] min-h-screen">
      <h2 className="text-4xl md:text-5xl font-bold p-6 text-center mt-5">Explore Courses</h2>
      
      <div className="mb-6 flex flex-col md:flex-row md:justify-center md:items-center md:gap-2">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="mt-4 md:mt-0 w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className='flex items-center justify-center'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center p-auto">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white shadow rounded-lg max-w-md">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-500 mb-2">Category: {course.category}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-gray-500 ml-2">({course.students} students)</span>
                </div>
                <p className="text-lg font-bold text-gray-600">${course.price.toFixed(2)}</p>
              </div>
              <div className="px-6 py-4 bg-gray-100">
                <button 
                  className="w-full bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEnroll(course.title)}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No courses found matching your criteria.</p>
      )}
    </div>
  );
};

export default Courses;