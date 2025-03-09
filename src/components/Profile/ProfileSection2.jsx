import { UserRoundPen } from "lucide-react";
import React from 'react';import CalendarProfile from "../Calendar";
import OngoingCourse from "../OngoingCourse";

//icons
import maleProfile from "../../assets/images/male.png";
import femaleProfile from "../../assets/images/female.png";
import reactIcon from "../../assets/icons/react.png";
import trophyIcon from "../../assets/icons/trophy.png";



const ProfileSection2 = () => {
    const gender = "male";//male/female
  return (
      <>
    {/* section 2 */}
      <div className="p-[1.5dvw] w-full h-full">
        <div className="flex justify-between items-center">
          <h1 className="text-bold text-[1.2dvw]">Profile</h1>
          <UserRoundPen />
        </div>
        <div className="flex flex-col h-[23dvh] w-full justify-between text-center items-center">
          <img
            src={gender === "male" ? maleProfile : femaleProfile}
            alt="Profile photo"
            className="w-[10dvw]"
          />
          <h1 className="text-[1.5dvw]">Aegon Targaryen</h1>
          <span className="text-gray-400 text-[0.8dvw]">Student</span>
        </div>

        {/* calendar */}
          <CalendarProfile />

        <h1 className="text-[1.2dvw] mt-[2dvh]">Ongoing Course</h1>
        <OngoingCourse course={"React"} topic={"Learning custom hooks"} percentage={"69"} image={reactIcon} />
        <OngoingCourse course={"React"} topic={"Learning custom hooks"} percentage={"69"} image={reactIcon} />
        <OngoingCourse course={"React"} topic={"Learning custom hooks"} percentage={"69"} image={reactIcon} />

        <div className="w-full h-[7dvw] bg-[#e9f1e9] rounded-lg mt-[2dvw] flex items-center justify-between">
          <div className="flex flex-col items-center ml-[2dvw]">
            <h1 className="text-[2dvw] font-bold">450</h1>
            <span className="text-[0.7dvw] text-gray-400">Points Collected</span>
          </div>
          <img src={trophyIcon} alt="Trophy" className="h-[9.5dvw] w-[9.5dvw]" />
        </div>
      </div>
      </>
  )
}

export default ProfileSection2
