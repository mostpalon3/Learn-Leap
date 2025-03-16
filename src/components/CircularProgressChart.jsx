import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularProgressChart = ({ percentage, label , color="#66D2CE", width="7dvw", height="7dvw"}) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, "#E8F9FF"],
        borderWidth: 3,
        hoverOffset: 4,
        cutout: "75%", 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <span className="relative m-[1dvw] mb-0" style={{ width: `${width}`, height: `${width}` }}>
      <Doughnut data={data} options={options} />
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-black text-xl font-bold">{percentage}%</span>
        <span className="text-gray-400 text-[0.65dvw] mt-1">{label}</span>
      </span>
    </span>
  );
};

export default CircularProgressChart;