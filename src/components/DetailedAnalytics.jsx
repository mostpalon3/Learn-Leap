import React, { useState } from 'react';
import { 
  Line, 
  Bar, 
  Doughnut 
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { 
  TrendingUp, 
  Clock, 
  Calendar, 
  BookOpen, 
  Award, 
  ArrowLeft,
  ChevronDown 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DetailedAnalytics = ({ user, onBack }) => {
  const [timeRange, setTimeRange] = useState('30days');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data - would come from your actual data source
  const studyHoursData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Study Hours',
        data: [5.5, 8, 6.5, 9.5],
        fill: true,
        backgroundColor: 'rgba(40, 89, 90, 0.1)',
        borderColor: '#28595a',
        tension: 0.3,
      },
      {
        label: 'Goal',
        data: [7, 7, 7, 7],
        borderColor: '#ff8400',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      }
    ],
  };

  const subjectDistributionData = {
    labels: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    datasets: [
      {
        data: [35, 25, 20, 10, 10],
        backgroundColor: [
          '#28595a',
          '#ff8400',
          '#dbf0dd',
          '#7FB5B5',
          '#FFB266'
        ],
        borderWidth: 0,
      },
    ],
  };

  const performanceBySubjectData = {
    labels: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    datasets: [
      {
        label: 'Quiz Scores (%)',
        data: [85, 72, 90, 68, 95],
        backgroundColor: '#28595a',
      },
      {
        label: 'Completion (%)',
        data: [75, 65, 80, 45, 90],
        backgroundColor: '#ff8400',
      },
    ],
  };

  const weeklyActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Hours Studied',
        data: [1.5, 2, 0.5, 3, 2.5, 4, 1],
        backgroundColor: '#28595a',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
    },
    cutout: '70%',
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const weeklyBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
  };

  // Stats summary data
  const stats = [
    { icon: Clock, label: 'Total Hours', value: '29.5', unit: 'hrs', color: 'bg-[#dbf0dd]' },
    { icon: BookOpen, label: 'Courses Completed', value: '3', unit: '', color: 'bg-amber-100' },
    { icon: Award, label: 'Points Earned', value: '450', unit: 'pts', color: 'bg-pink-100' },
    { icon: TrendingUp, label: 'Avg. Daily Time', value: '1.2', unit: 'hrs', color: 'bg-green-100' },
  ];

  // Time range options
  const timeRanges = [
    { id: '7days', label: 'Last 7 Days' },
    { id: '30days', label: 'Last 30 Days' },
    { id: '90days', label: 'Last 90 Days' },
    { id: 'year', label: 'This Year' },
  ];

  const navigate = useNavigate();

  const backGo = () => {
    navigate('/profile');
  };

  return (
    <div className="w-[85dvw] flex flex-col relative left-[15%] bg-[#f6fbf6] p-6 rounded-xl h-screen overflow-y-auto">
      {/* Header with back button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button 
            onClick={backGo} 
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-[#28595a]" />
          </button>
          <h1 className="text-2xl font-bold text-[#28595a]">Detailed Analytics</h1>
        </div>
        
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-[#28595a] hover:border-[#28595a] transition-colors">
            {timeRanges.find(r => r.id === timeRange)?.label}
            <ChevronDown size={16} />
          </button>
          {/* Dropdown would go here */}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className={`p-3 rounded-lg mr-3 ${stat.color}`}>
              <stat.icon size={20} className="text-gray-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold text-[#28595a]">
                {stat.value} <span className="text-sm font-normal">{stat.unit}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {['overview', 'subjects', 'progress', 'achievements'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === tab 
                ? 'text-[#28595a] border-b-2 border-[#28595a]' 
                : 'text-gray-500 hover:text-[#28595a]'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main content - changes based on active tab */}
      {activeTab === 'overview' && (
        <>
          {/* Study Hours Trend */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-[#28595a] mb-6 flex items-center">
                <TrendingUp size={18} className="mr-2 text-[#ff8400]" />
                Study Hours Trend
              </h2>
              <div className="h-64">
                <Line data={studyHoursData} options={chartOptions} />
              </div>
            </div>

            {/* Subject Distribution */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-[#28595a] mb-6 flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff8400]" />
                Subject Distribution
              </h2>
              <div className="h-64">
                <Doughnut data={subjectDistributionData} options={doughnutOptions} />
              </div>
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-[#28595a] mb-6 flex items-center">
                <Calendar size={18} className="mr-2 text-[#ff8400]" />
                Weekly Activity
              </h2>
              <div className="h-64">
                <Bar data={weeklyActivityData} options={weeklyBarOptions} />
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'subjects' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-[#28595a] mb-6 flex items-center">
            <BookOpen size={18} className="mr-2 text-[#ff8400]" />
            Performance by Subject
          </h2>
          <div className="h-96">
            <Bar data={performanceBySubjectData} options={barOptions} />
          </div>
        </div>
      )}

      {/* You can add more tab content for 'progress' and 'achievements' */}
      {activeTab === 'progress' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-[#28595a] mb-4">
            Course Progress Tracking
          </h2>
          <p className="text-gray-500 mb-6">Detailed view of your course progress would go here.</p>
          {/* Progress tracking content */}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-[#28595a] mb-4">
            Your Achievements
          </h2>
          <p className="text-gray-500 mb-6">Badges, certificates, and achievements would be displayed here.</p>
          {/* Achievements content */}
        </div>
      )}
    </div>
  );
};

export default DetailedAnalytics;