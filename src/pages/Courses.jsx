import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Users, BookOpen, HeartHandshake } from 'lucide-react';

const Courses = () => {
  const navigate = useNavigate();

  const [courses] = useState([
    { id: 1, title: 'Introduction to React', instructor: 'John Doe', category: 'Web Development', rating: 4.5, students: 1200, price: 49.99, image: 'react.jpg', scholarshipEligible: true },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith', category: 'Programming', rating: 4.8, students: 980, price: 59.99, image: 'javascript.jpg', scholarshipEligible: true },
    { id: 3, title: 'Machine Learning Basics', instructor: 'Alex Johnson', category: 'Data Science', rating: 4.6, students: 1500, price: 69.99, image: 'machine-learning.jpg', scholarshipEligible: false },
    { id: 4, title: 'UI/UX Design Principles', instructor: 'Emily Brown', category: 'Design', rating: 4.7, students: 850, price: 54.99, image: 'ui-ux.jpg', scholarshipEligible: true },
    { id: 5, title: 'Full Stack Web Development', instructor: 'Mark Wilson', category: 'Web Development', rating: 4.9, students: 2000, price: 79.99, image: 'fullstack.jpg', scholarshipEligible: false },
    { id: 6, title: 'Python Programming', instructor: 'Jessica Lee', category: 'Programming', rating: 4.7, students: 1100, price: 64.99, image: 'python.jpg', scholarshipEligible: true },
    { id: 7, title: 'Data Analysis with Python', instructor: 'David Moore', category: 'Data Science', rating: 4.8, students: 1300, price: 74.99, image: 'data-analysis.jpg', scholarshipEligible: true },
    { id: 8, title: 'Graphic Design Fundamentals', instructor: 'Sophia Davis', category: 'Design', rating: 4.6, students: 950, price: 59.99, image: 'graphic-design.jpg', scholarshipEligible: false },
    { id: 9, title: 'React Native Development', instructor: 'Michael Taylor', category: 'Web Development', rating: 4.7, students: 1800, price: 69.99, image: 'react-native.jpg', scholarshipEligible: true },
    { id: 10, title: 'Java Programming', instructor: 'Oliver Clark', category: 'Programming', rating: 4.5, students: 1000, price: 54.99, image: 'java.jpg', scholarshipEligible: false },
    { id: 11, title: 'Data Visualization with Python', instructor: 'Emma White', category: 'Data Science', rating: 4.8, students: 1400, price: 79.99, image: 'data-viz.jpg', scholarshipEligible: true },
    { id: 12, title: 'Logo Design Masterclass', instructor: 'William Anderson', category: 'Design', rating: 4.7, students: 900, price: 64.99, image: 'logo-design.jpg', scholarshipEligible: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showScholarshipOnly, setShowScholarshipOnly] = useState(false);

  const categories = ['All', 'Web Development', 'Programming', 'Data Science', 'Design'];

  const filteredCourses = courses.filter(course => 
    (selectedCategory === 'All' || course.category === selectedCategory) &&
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!showScholarshipOnly || course.scholarshipEligible)
  );

  const handleEnroll = (courseTitle) => {
    const formattedTitle = courseTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/courses/${formattedTitle}`);
  };

  const handleAuditRequest = (courseId) => {
    // This would typically open a modal or navigate to a form
    console.log(`Audit request for course ${courseId}`);
    // For now, let's show an alert
    alert('Your audit access request has been submitted. Our team will review your application and contact you within 48 hours.');
  };

  // Function to generate a category-based background color
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Web Development':
        return 'bg-[#dbf0dd]';
      case 'Programming':
        return 'bg-[#e0f0ef]';
      case 'Data Science':
        return 'bg-[#f0e6dd]';
      case 'Design':
        return 'bg-[#e8e0f0]';
      default:
        return 'bg-[#dbf0dd]';
    }
  };

  return (
    <div className="relative left-[15%] bg-[#f6fbf6] w-[85%] min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative bg-[#28595a] text-white py-16 px-8 rounded-b-3xl mb-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-full w-full">
            <circle cx="75" cy="25" r="20" fill="white" />
            <circle cx="30" cy="70" r="30" fill="white" />
            <circle cx="80" cy="80" r="15" fill="white" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Discover a wide range of courses designed to help you master new skills, advance your career, and achieve your learning goals.
          </p>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="max-w-6xl mx-auto px-8 mb-10">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#28595a] transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="w-full appearance-none px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#28595a] transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Filter className="absolute left-4 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters and Scholarship Filter */}
      <div className="max-w-6xl mx-auto px-8 mb-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category 
                    ? 'bg-[#28595a] text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#28595a]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setShowScholarshipOnly(!showScholarshipOnly)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showScholarshipOnly
                  ? 'bg-[#ff8400] text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[#ff8400]'
              }`}
            >
              <HeartHandshake size={18} className="mr-2" />
              Scholarship Eligible
            </button>
          </div>
        </div>
      </div>

      {/* Scholarship Info Banner */}
      <div className="max-w-6xl mx-auto px-8 mb-8">
        <div className="bg-[#dbf0dd] border-l-4 border-[#28595a] rounded-lg p-4">
          <div className="flex items-start">
            <HeartHandshake className="text-[#28595a] mt-1 mr-3 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-[#28595a] mb-1">Audit Access for Disadvantaged Students</h3>
              <p className="text-gray-700">
                We offer free audit access to eligible students facing financial hardship. 
                Click the "Request Audit Access" button on any eligible course to apply.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              {/* Course Image */}
              <div className={`h-48 ${getCategoryColor(course.category)} flex items-center justify-center relative`}>
                <BookOpen size={64} className="text-[#28595a] opacity-50" />
                {course.scholarshipEligible && (
                  <div className="absolute top-4 right-4 bg-[#ff8400] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <HeartHandshake size={12} className="mr-1" />
                    Scholarship Eligible
                  </div>
                )}
              </div>
              
              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#dbf0dd] text-[#28595a]">
                    {course.category}
                  </span>
                  <div className="flex items-center text-amber-500">
                    <Star className="fill-amber-500 stroke-amber-500" size={16} />
                    <span className="ml-1 text-sm font-medium">{course.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">{course.title}</h3>
                
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Instructor:</span> {course.instructor}
                </p>
                
                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <Users size={16} />
                  <span className="ml-2">{course.students.toLocaleString()} students</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#28595a]">${course.price.toFixed(2)}</span>
                  <div className="flex flex-col gap-2">
                    <button 
                      className="px-4 py-2 bg-[#ff8400] hover:bg-[#e67700] text-white font-medium rounded-lg transition-colors"
                      onClick={() => handleEnroll(course.title)}
                    >
                      Enroll Now
                    </button>
                    
                    {course.scholarshipEligible && (
                      <button 
                        className="px-4 py-2 border border-[#28595a] text-[#28595a] hover:bg-[#28595a] hover:text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center"
                        onClick={() => handleAuditRequest(course.id)}
                      >
                        <HeartHandshake size={14} className="mr-1" />
                        Request Audit Access
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 px-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#dbf0dd] text-[#28595a] mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No courses found</h3>
            <p className="text-gray-600">
              We couldn't find any courses matching your search criteria. 
              Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;