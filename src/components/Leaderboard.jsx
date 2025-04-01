import React from "react";
import { Trophy, TrendingDown, TrendingUp, Clock, Book, Award } from "lucide-react";

const leaderboardData = [
  { name: "Aryan B.", score: 980, course:"15/25", hours: 120, movement: "up" },
  { name: "Deepesh", score: 950, course:"15/25", hours: 110, movement: "down" },
  { name: "Sumit Sagar", score: 920, course:"15/25", hours: 105, movement: "up" },
  { name: "Shivam Chauhan", score: 890, course:"15/25", hours: 98, movement: "down" },
];

const Leaderboard = () => {
  return (
    <div className="mt-2 overflow-hidden rounded-lg border border-[#dbf0dd] bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#f6fbf6] border-b border-[#dbf0dd]">
            <th className="p-3 text-sm font-medium text-[#28595a]">Rank</th>
            <th className="p-3 text-sm font-medium text-[#28595a]">Name</th>
            <th className="p-3 text-sm font-medium text-[#28595a] hidden sm:table-cell">
              <div className="flex items-center">
                <Book size={14} className="mr-1.5 text-[#ff8400]" />
                Course Progress
              </div>
            </th>
            <th className="p-3 text-sm font-medium text-[#28595a] hidden md:table-cell">
              <div className="flex items-center">
                <Clock size={14} className="mr-1.5 text-[#ff8400]" />
                Hours
              </div>
            </th>
            <th className="p-3 text-sm font-medium text-[#28595a]">
              <div className="flex items-center">
                <Award size={14} className="mr-1.5 text-[#ff8400]" />
                Points
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((student, index) => (
            <tr 
              key={index} 
              className={`border-b border-[#dbf0dd] last:border-0 hover:bg-[#f6fbf6] transition-colors ${
                index === 0 ? 'bg-[#fff9e6]' : ''
              }`}
            >
              <td className="p-3">
                <div className="flex items-center">
                  {index === 0 ? (
                    <div className="w-7 h-7 bg-[#ffcb42] text-white rounded-full flex items-center justify-center mr-2 shadow-sm">
                      <Trophy size={14} />
                    </div>
                  ) : (
                    <div className="w-7 h-7 bg-[#dbf0dd] text-[#28595a] rounded-full flex items-center justify-center mr-2 font-medium">
                      {index + 1}
                    </div>
                  )}
                  
                  {student.movement === "up" ? (
                    <TrendingUp size={16} className="text-green-500" />
                  ) : (
                    <TrendingDown size={16} className="text-red-500" />
                  )}
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#28595a] text-white rounded-full flex items-center justify-center mr-2 font-medium text-sm">
                    {student.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-800">{student.name}</span>
                </div>
              </td>
              <td className="p-3 hidden sm:table-cell">
                <div className="flex items-center">
                  <div className="w-full max-w-[120px] bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#28595a] rounded-full"
                      style={{ width: `${(parseInt(student.course.split('/')[0]) / parseInt(student.course.split('/')[1])) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-500">{student.course}</span>
                </div>
              </td>
              <td className="p-3 hidden md:table-cell text-gray-700">{student.hours}h</td>
              <td className="p-3">
                <span className="font-bold text-[#28595a]">{student.score}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;