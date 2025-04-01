import React, { useState } from 'react';
import { 
  UserRoundPen, 
  Calendar as CalendarIcon, 
  BookOpen, 
  Settings, 
  Trophy, 
  CheckCircle,
  GraduationCap,
  BarChart3,
  ChevronRight,
  Star
} from "lucide-react";
import CalendarProfile from "../Calendar";
import OngoingCourse from "../OngoingCourse";

//icons
import maleProfile from "../../assets/images/male.png";
import femaleProfile from "../../assets/images/female.png";
import reactIcon from "../../assets/icons/react.png";
import trophyIcon from "../../assets/icons/trophy.png";

const ProfileSection2 = ({user}) => {
  const gender = "male"; //male/female
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  
  // Mock skill data
  const skills = [
    { name: "Javascript", level: 85 },
    { name: "React.js", level: 70 },
    { name: "CSS", level: 65 },
    { name: "Node.js", level: 40 }
  ];
  
  // Mock badges data
  const badges = [
    { name: "Quick Learner", icon: "🚀", color: "bg-blue-100" },
    { name: "Problem Solver", icon: "🧩", color: "bg-purple-100" },
    { name: "Streak Master", icon: "🔥", color: "bg-orange-100" }
  ];
  
  // Mock statistics
  const stats = [
    { label: "Courses", value: "12" },
    { label: "Hours", value: "87" },
    { label: "Certificates", value: "5" }
  ];
  
  return (
    <div className="p-6 w-full h-screen overflow-y-auto bg-white shadow-sm">
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-bold text-[1.2dvw]">Profile</h1>
        <button className="text-[#28595a] hover:text-[#ff8400] transition-colors rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#f6fbf6]">
          <Settings size={18} />
        </button>
      </div>
      
      {/* Profile Info */}
      <div className="flex flex-col items-center pb-6 mb-6 border-b border-[#dbf0dd]">
        <div className="relative">
          <img
            src={gender === "male" ? maleProfile : femaleProfile}
            alt="Profile photo"
             className="w-[10dvw]"
          />
          <button className="absolute bottom-0 right-0 bg-[#28595a] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#1e4445] transition-colors">
            <UserRoundPen size={14} />
          </button>
        </div>
        
        <h1 className="text-xl font-bold mt-3 text-[#28595a]">{user?.displayName || "Jon Snow"}</h1>
        <span className="text-gray-500 text-sm flex items-center">
          <GraduationCap size={14} className="mr-1" />
          Student
        </span>
        
        {/* Quick Stats */}
        <div className="flex justify-between w-full mt-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[#28595a]">{stat.value}</span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Calendar Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-md font-bold text-[#28595a] flex items-center">
            <CalendarIcon size={16} className="mr-2 text-[#ff8400]" />
            My Calendar
          </h3>
          <button 
            onClick={() => setShowFullCalendar(!showFullCalendar)} 
            className="text-xs text-[#28595a] hover:text-[#ff8400] transition-colors"
          >
            {showFullCalendar ? "Minimize" : "Expand"}
          </button>
        </div>
        <div className={`${showFullCalendar ? "" : "max-h-[180px] overflow-hidden"} transition-all duration-300`}>
          <CalendarProfile />
        </div>
      </div>
      
      {/* Ongoing Courses */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-md font-bold text-[#28595a] flex items-center">
            <BookOpen size={16} className="mr-2 text-[#ff8400]" />
            Ongoing Courses
          </h3>
          <button className="text-xs text-[#28595a] hover:text-[#ff8400] transition-colors flex items-center">
            View All
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
        
        <div className="space-y-3">
          <OngoingCourse course={"React"} topic={"Learning custom hooks"} percentage={"69"} image={reactIcon} />
          <OngoingCourse course={"Data Structures"} topic={"Arrays and Linked Lists"} percentage={"45"} image={reactIcon} />
          <OngoingCourse course={"UI/UX Design"} topic={"User Research Methods"} percentage={"32"} image={reactIcon} />
        </div>
      </div>
      
      {/* Skills Section */}
      <div className="mb-6">
        <h3 className="text-md font-bold text-[#28595a] flex items-center mb-3">
          <BarChart3 size={16} className="mr-2 text-[#ff8400]" />
          My Skills
        </h3>
        
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                <span className="text-xs text-gray-500">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#28595a] rounded-full" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Badges Section */}
      <div className="mb-6">
        <h3 className="text-md font-bold text-[#28595a] flex items-center mb-3">
          <CheckCircle size={16} className="mr-2 text-[#ff8400]" />
          My Badges
        </h3>
        
        <div className="flex justify-between">
          {badges.map((badge, index) => (
            <div key={index} className={`${badge.color} p-3 rounded-lg text-center w-[30%]`}>
              <div className="text-2xl mb-1">{badge.icon}</div>
              <div className="text-xs font-medium text-gray-700">{badge.name}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Points Card */}
      <div className="bg-[#dbf0dd] rounded-lg p-4 flex items-center justify-between relative overflow-hidden">
        <div className="flex flex-col z-10">
          <span className="text-sm text-[#28595a] mb-1 font-medium">Overall Performance</span>
          <h2 className="text-3xl font-bold text-[#28595a]">450</h2>
          <span className="text-xs text-[#28595a] opacity-70">Points Collected</span>
          
          <div className="flex items-center mt-2">
            <Star size={14} className="fill-[#ff8400] text-[#ff8400] mr-1" />
            <span className="text-xs font-medium text-[#28595a]">Level 4 Achiever</span>
          </div>
        </div>
        
        <img src={trophyIcon} alt="Trophy" className="h-28 w-28 z-10" />
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c7e6c9] rounded-full transform translate-x-16 -translate-y-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#c7e6c9] rounded-full transform -translate-x-12 translate-y-12 opacity-30"></div>
      </div>
    </div>
  );
};

export default ProfileSection2;