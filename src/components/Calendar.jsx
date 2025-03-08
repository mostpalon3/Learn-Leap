import React, { useState } from "react";

const CalendarProfile = () => {
  const today = new Date();
  const todayDay = today.getDay();
  const todayDate = today.getDate();
  console.log(todayDay + " " + todayDate);
  const weekDays = ["S", "S", "M", "T", "W", "T", "F"];

  // Get the first day of the current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  // Generate dates dynamically
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return String(date.getDate()).padStart(2, "0");
  });

  const [todayState, setTodayState] = useState(false);

  return (
    <>
      <ul className="flex justify-between text-[0.7dvw] p-[1.5dvw] pb-[0.7dvw]">
        {weekDays.map((day, index) => (
          <li key={index}>{day}</li>
          // {day===todayDay ? setTodayState(true) : setTodayState(false)}
        ))}
      </ul>
      <ul className="flex justify-between text-[0.8dvw] pl-[1.2dvw] pr-[0.8dvw]">
        {weekDates.map((date, index) => (
          <li
            key={index}
            className="h-[1.5dvw] w-[1.5dvw] bg-white rounded-full flex justify-center items-center"
          >
            {date}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CalendarProfile;