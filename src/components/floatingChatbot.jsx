import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const FloatingChatbot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(null);

  
  const excludedRoutes = ["/home", "/login", "/signup", "/quiz"];

  if (excludedRoutes.includes(location.pathname)) {
    return null;
  }

  const handleChatbotClick = () => {
    if (location.pathname === "/chat") {
      navigate(prevPath || "/");
    } else {
      setPrevPath(location.pathname);
      navigate("/chat");
    }
  };

  return (
    <div className="fixed bottom-15 right-12 z-50">
      <button
        className="w-16 h-16 opacity-50 bg-green-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-pink-600 transition"
        onClick={handleChatbotClick}
      >
        <FaRobot size={24} />
      </button>
    </div>
  );
};

export default FloatingChatbot;