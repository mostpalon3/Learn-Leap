export const CircularProgress = ({ percentage }) => {
  const radius = 40; 
  const circumference = 2 * Math.PI * radius; 
  const strokeDashoffset = circumference * (1 - percentage / 100); 

  return (
    <div className="relative flex items-center justify-center right-[-1dvw]">
      {/* Background Circle */}
      <svg width="3.5dvw" height="3.5dvw" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#F2EFE7"
          strokeWidth="12"
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="orange"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {/* Percentage Text */}
      <span className="absolute text-[0.6dvw] text-gray-700">
        {percentage}%
      </span>
    </div>
  );
};
