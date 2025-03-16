import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarProfile = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const todayDay = today.getDay();
  const todayDate = String(today.getDate()).padStart(2, "0");

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return String(date.getDate()).padStart(2, "0");
  });

  const goToPreviousWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  return (
    <>
      <div className="w-full bg-[#e1f4e7] h-[15dvh] flex flex-col rounded-lg mt-[2dvw]">
        <div className="p-[0.7dvw] flex justify-between items-center">
          <button onClick={goToPreviousWeek}>
            <ChevronLeft className="cursor-pointer hover:text-gray-600" />
          </button>
          <h1 className="text-[0.9dvw]">
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </h1>
          <button onClick={goToNextWeek}>
            <ChevronRight className="cursor-pointer hover:text-gray-600" />
          </button>
        </div>

        <ul className="flex justify-between text-[0.7dvw] p-[1.5dvw] pb-[0.7dvw]">
          {weekDays.map((day, index) => (
            <li
              key={index}
              className={`${
                index === todayDay && currentDate.toDateString() === today.toDateString()
                  ? "text-[#03852a] font-extrabold"
                  : ""
              }`}
            >
              {day}
            </li>
          ))}
        </ul>

        <ul className="flex justify-between text-[0.8dvw] pl-[1.2dvw] pr-[0.8dvw]">
          {weekDates.map((date, index) => (
            <li
              key={index}
              className={`h-[1.5dvw] w-[1.5dvw] rounded-full flex justify-center items-center ${
                date === todayDate && currentDate.toDateString() === today.toDateString()
                  ? "bg-[#006b20] text-white font-bold"
                  : "bg-white"
              }`}
            >
              {date}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CalendarProfile;