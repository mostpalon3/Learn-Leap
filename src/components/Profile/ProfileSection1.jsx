import React, { useState } from "react";
import { getFormattedTime } from "../TimeFormat.mjs";
import { 
  BookOpen, 
  Search, 
  PlusCircle, 
  ChevronRight, 
  Clock, 
  TrendingUp, 
  Award, 
  Zap, 
  Calendar,
  Medal,
  Target,
  X
} from "lucide-react";
import clsx from "clsx";

// Importing images
import profileVector from "../../assets/images/profile-vector.png";
import Leaderboard from "../Leaderboard";
import CircularProgressChart from "../CircularProgressChart";
import { useNavigate } from "react-router-dom";

// Import the DetailedAnalytics component
import DetailedAnalytics from "../DetailedAnalytics.jsx";

const ProfileSection1 = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailedAnalytics, setShowDetailedAnalytics] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    subject: "",
    color: "amber",
    icon: "Zap",
    time: "",
    duration: ""
  });
  
  // Convert schedule object to state so we can update it
  const [scheduleItems, setScheduleItems] = useState({
    1: {
      index: 0,
      subject: "Physics",
      color: "amber",
      icon: "Zap",
      time: "10:00 AM",
      duration: "1 hour"
    },
    2: {
      index: 1,
      subject: "Chemistry",
      color: "pink",
      icon: "Flask",
      time: "1:00 PM",
      duration: "45 min"
    },
    3: {
      index: 2,
      subject: "Mathematics",
      color: "green",
      icon: "Calculator",
      time: "3:30 PM",
      duration: "1 hour"
    },
  });

  const navigate = useNavigate();
  
  const getSubjectIcon = (iconName) => {
    const icons = {
      "Zap": Zap,
      "Flask": BookOpen, 
      "Calculator": Target, 
    };
    return icons[iconName] || BookOpen;
  };

  // If detailed analytics should be shown, render the component
  if (showDetailedAnalytics) {
    navigate("/detailed-analytics");
  }

  // Format time from 24h format to 12h format with AM/PM
  const formatTime = (time) => {
    if (!time) return "";
    
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      
      if (hour === 0) {
        return `12:${minutes} AM`;
      } else if (hour < 12) {
        return `${hour}:${minutes} AM`;
      } else if (hour === 12) {
        return `12:${minutes} PM`;
      } else {
        return `${hour - 12}:${minutes} PM`;
      }
    } catch (error) {
      console.error("Error formatting time:", error);
      return time;
    }
  };

  // Handle adding a new schedule
  const handleAddSchedule = () => {
    // Validate form
    if (!newSchedule.subject || !newSchedule.time || !newSchedule.duration) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Create a new schedule item
    const newIndex = Object.keys(scheduleItems).length + 1;
    const formattedTime = formatTime(newSchedule.time);
    
    // Add the new schedule to the state
    setScheduleItems(prev => ({
      ...prev,
      [newIndex]: {
        index: newIndex - 1,
        subject: newSchedule.subject,
        color: newSchedule.color,
        icon: newSchedule.icon,
        time: formattedTime,
        duration: newSchedule.duration
      }
    }));
    
    // Close the modal
    setShowScheduleModal(false);
    
    // Reset the form
    setNewSchedule({
      subject: "",
      color: "amber",
      icon: "Zap",
      time: "",
      duration: ""
    });
  };

  // Handle input changes for the new schedule form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle delete schedule item
  const handleDeleteSchedule = (index) => {
    setScheduleItems(prev => {
      const newItems = {...prev};
      delete newItems[index];
      return newItems;
    });
  };

  return (
    <div className="border-r-[0.1px] border-gray-300 w-[72%] p-[3dvw] pt-[4vh] h-screen overflow-y-auto overflow-x-hidden flex-shrink-0 scroll-bar scroll-smooth bg-[#f6fbf6]">
      {/* Search and Add New Button */}
      <div className="flex justify-between items-center w-full mb-6">
        <div className="relative w-[70%]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for courses, topics, or resources..."
            className="h-[3.3dvw] w-full border-[1px] border-gray-200 bg-white rounded-lg pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#28595a] transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button className="flex items-center px-4 py-3 rounded-lg bg-[#ff8400] hover:bg-[#e67700] text-white transition-colors shadow-sm">
          <PlusCircle size={18} className="mr-2" />
          <span className="font-medium">Add New Course</span>
        </button>
      </div>

      <div className="flex w-[55dvw] h-[26dvh] bg-[#28595a] mt-[3.5dvh] rounded-3xl pr-[1dvw] box-border shadow-md shadow-amber-100 mb-[10dvh]">
        <img
          src={profileVector}
          alt=""
          className="aspect-auto h-[36vh] flex relative left-[-3dvw]"
        />
        <div className="flex flex-col justify-center items-start h-full w-full ml-[-3dvw]">
          <span className="text-[#fafffa] text-[1dvw] mb-[-0.8dvw]">
            Welcome back
          </span>
          <h1
            className="text-[#fafffa]"
            style={{
              fontSize: `${Math.max(
                2,
                4.5 - (user?.displayName?.length || 5) * 0.1
              )}dvw`,
            }}
          >
            {user?.displayName || "Jon Snow"}
          </h1>
          <p
            className="text-[#fafffa] text-sm text-[1dvw] mt-[0.8dvw] hover:underline cursor-pointer"
            onClick={() => navigate("/courses")}
          >
            Go back to the courses &rarr;
          </p>
        </div>
      </div>

      {/* Today's Schedule and Progress Section */}
      <div className="flex justify-between items-stretch gap-6 mb-8">
        {/* Today's Schedule */}
        <div className="w-[65%] bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#28595a] flex items-center">
              <Calendar size={20} className="mr-2 text-[#ff8400]" />
              Today's Schedule
            </h2>
            <button className="text-sm text-[#28595a] hover:text-[#ff8400] transition-colors font-medium flex items-center">
              View all
              <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
          
          {Object.keys(scheduleItems).length > 0 ? (
            <div className="space-y-4">
              {Object.values(scheduleItems).map((item) => {
                const SubjectIcon = getSubjectIcon(item.icon);
                return (
                  <div
                    className="flex items-center gap-4 group transition-transform hover:translate-x-1 cursor-pointer"
                    key={item.index}
                  >
                    <div className={clsx(
                      "flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center",
                      {
                        "bg-amber-100 text-amber-700": item.color === "amber",
                        "bg-pink-100 text-pink-700": item.color === "pink",
                        "bg-green-100 text-green-700": item.color === "green",
                      }
                    )}>
                      <div className="text-lg font-bold">{item.time.split(' ')[0]}</div>
                      <div className="text-xs">{item.time.split(' ')[1]}</div>
                    </div>
                    
                    <div className="flex-1 bg-[#f6fbf6] rounded-lg p-3 pl-4 border border-[#dbf0dd] relative">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <SubjectIcon className={clsx(
                            "mr-3",
                            {
                              "text-amber-500": item.color === "amber",
                              "text-pink-500": item.color === "pink",
                              "text-green-500": item.color === "green",
                            }
                          )} size={20} />
                          <span className="font-semibold text-gray-800">{item.subject}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock size={14} className="mr-1" />
                          {item.duration}
                        </div>
                      </div>
                      
                      {/* Delete button that appears on hover */}
                      <button 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSchedule(item.index + 1);
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No schedule items yet. Add your first one!
            </div>
          )}
          
          <button 
            className="mt-6 w-full py-2 border border-[#28595a] text-[#28595a] rounded-lg hover:bg-[#28595a] hover:text-white transition-colors text-sm font-medium"
            onClick={() => setShowScheduleModal(true)}
          >
            Add New Schedule
          </button>
        </div>
        
        {/* Monthly Progress */}
        <div className="w-[35%] bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <TrendingUp size={20} className="mr-2 text-[#ff8400]" />
            <h2 className="text-xl font-bold text-[#28595a]">Last 30 Days</h2>
          </div>
          
          <div className="flex justify-between items-center">
            <CircularProgressChart percentage={23} label="Hours Target" />
            <CircularProgressChart percentage={69} label="Course Completion" />
          </div>
          
          <div className="mt-4 p-3 bg-[#f6fbf6] rounded-lg border border-[#dbf0dd]">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Monthly Goal</span>
                <div className="text-[#28595a] font-bold">25 hours</div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Completed</span>
                <div className="text-[#28595a] font-bold">5.75 hours</div>
              </div>
            </div>
          </div>
          
          <button 
            className="mt-3 w-full py-2 text-[#28595a] text-sm font-medium flex items-center justify-center hover:text-[#ff8400] transition-colors"
            onClick={() => setShowDetailedAnalytics(true)}
          >
            View Detailed Analytics
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#28595a] flex items-center">
            <Medal size={20} className="mr-2 text-[#ff8400]" />
            Leaderboard
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-[#dbf0dd] text-[#28595a] px-3 py-1 rounded-full font-medium">
              This Week
            </span>
            <span className="text-sm text-gray-500 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
              All Time
            </span>
          </div>
        </div>
        
        <Leaderboard />
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-white bg-[#28595a] rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
              {(user?.displayName?.[0] || "J").toUpperCase()}
            </div>
            <div>
              <div className="font-medium">{user?.displayName || "Jon Snow"}</div>
              <div className="text-xs text-gray-500">Your Rank: #3</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Award size={18} className="text-[#ff8400] mr-2" />
            <span className="font-bold text-[#28595a]">450 Points</span>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px] max-w-[90%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#28595a] flex items-center">
                <Calendar size={20} className="mr-2 text-[#ff8400]" />
                Add New Schedule
              </h2>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={newSchedule.subject}
                  onChange={handleInputChange}
                  placeholder="e.g. Physics, Chemistry"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#28595a]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newSchedule.time}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#28595a]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={newSchedule.duration}
                    onChange={handleInputChange}
                    placeholder="e.g. 1 hour, 45 min"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#28595a]"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                  Color Theme
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setNewSchedule(prev => ({...prev, color: "amber"}))}
                    className={`w-8 h-8 rounded-full bg-amber-100 border-2 ${newSchedule.color === "amber" ? "border-amber-500" : "border-transparent"}`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setNewSchedule(prev => ({...prev, color: "pink"}))}
                    className={`w-8 h-8 rounded-full bg-pink-100 border-2 ${newSchedule.color === "pink" ? "border-pink-500" : "border-transparent"}`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setNewSchedule(prev => ({...prev, color: "green"}))}
                    className={`w-8 h-8 rounded-full bg-green-100 border-2 ${newSchedule.color === "green" ? "border-green-500" : "border-transparent"}`}
                  ></button>
                </div>
              </div>
              
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <select
                  id="icon"
                  name="icon"
                  value={newSchedule.icon}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#28595a]"
                >
                  <option value="Zap">Lightning</option>
                  <option value="Flask">Flask</option>
                  <option value="Calculator">Calculator</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSchedule}
                  className="flex-1 py-2 bg-[#28595a] text-white rounded-lg hover:bg-[#1e4142] transition-colors"
                >
                  Add Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection1;