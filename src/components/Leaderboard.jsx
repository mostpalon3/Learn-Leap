import React from "react";

const leaderboardData = [
  { name: "Aryan", score: 980, course:"15/25", hours: 120, movement: "up" },
  { name: "Deepesh", score: 950, course:"15/25", hours: 110, movement: "down" },
  { name: "Sumit", score: 920, course:"15/25", hours: 105, movement: "up" },
  { name: "Shivam", score: 890, course:"15/25", hours: 98, movement: "down" },
];

const Leaderboard = () => {
  return (
    <div className="mt-[2dvh]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className=" bg-transparent shadow-sm">
            <th className="p-2">Rank</th>
            <th className="p-2">Name</th>
            <th className="p-2">Course</th>
            <th className="p-2">Hours</th>
            <th className="p-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((student, index) => (
            <tr key={index} className="border-b-[0.1px] border-gray-300">
              <td className="p-2 font-bold inline-block">{index + 1}
              {student.movement === "up" ? (
                  <span className="text-green-500 text-[0.8dvw] font-bold"> ▲</span>
                ) : (
                  <span className="text-red-500 text-[0.8dvw] font-bold"> ▼</span>
                )}
              </td>
              <td className="p-2">{student.name}</td>
              <td className="p-2">{student.course}</td>
              <td className="p-2">{student.hours}h</td>
              <td className="p-2">{student.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;