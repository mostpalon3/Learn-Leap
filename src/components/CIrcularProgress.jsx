export const CircularProgress = ({ 
  percentage, 
  size = "3.5dvw", 
  strokeWidth = 12, 
  progressColor = "orange", 
  bgColor = "" ,
  text = false
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <div className="flex relative items-center justify-center" style={{ width: size, height: size }}>
      {/* Background Circle */}
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {/* Percentage Text */}
      <span className="absolute text-gray-700" style={{ fontSize: `calc(${size} * 0.2) ` }}>
        {percentage}%
        {text&&<div className="text-gray-400 text-[0.5dvw] flex justify-center items-center">{text}</div>}
      </span>
    </div>
  );
};