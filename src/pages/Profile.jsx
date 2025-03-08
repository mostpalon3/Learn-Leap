import { Calendar, ChevronLeft, ChevronRight, UserRoundPen } from "lucide-react";
import React from "react";
import OngoingCourse from "../components/OngoingCourse";
import CalendarProfile from "../components/Calendar";

function Profile() {
  const gender = "male";
  return (
    <div className="container flex relative left-[15%] bg-[#f0f9f0] w-[85%] min-h-screen ">
      {/* ssection 1 */}
      <div className="border-r-[0.1px] border-gray-400 w-[72%] p-[3dvw] pt-[4vh] h-full">
        <div className="flex justify-between items-center w-[55dvw]">
          <input
            type="text"
            placeholder={`Search for course`}
            className="h-[3.3dvw] border-[0.5px] bg-transparent border-gray-300 rounded-lg p-4 w-[35dvw]"
          />
          <button className="p-[0.9dvw] rounded-md bg-[#ff8400] text-[#fafffa] text-[0.9dvw]">
            Add New +
          </button>
        </div>

        <div className="flex w-[55dvw] h-[26dvh] bg-[#28595a] mt-[3.5dvh] rounded-3xl pr-[1dvw] box-border shadow-md shadow-amber-100">
          <img
            src="./src/assets/images/profile-vector.png"
            alt=""
            className="aspect-auto h-[36vh] flex relative left-[-3dvw]"
          />
          <div className="flex flex-col justify-center items-start h-full w-full ml-[-3dvw]">
            <span className="text-[#fafffa] text-[1dvw] mb-[-0.8dvw]">
              Welcome back
            </span>
            <h1 className="text-[4dvw] text-[#fafffa]">John Snow</h1>
            <p className="text-[#fafffa] text-sm text-[1dvw] mt-[0.8dvw]">
              Go back to the courses &rarr;
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center w-[55dvw] mt-[10dvh]">
          <div className="w-[32.5dvw] h-[30dvh] border-[1px] border-gray-300 rounded-2xl p-[1.5dvw]">
            <div className="flex justify-between items-center">
              <h2 className="text-bold text-[1.2dvw]">Today's Schedule</h2>
              <span className="text-[0.8dvw]">View all &rarr;</span>
            </div>
          </div>
          <div className="w-[20dvw] h-[30dvh] border-[1px] border-gray-300 rounded-2xl p-[1.5dvw]">
            <div className="flex justify-between items-center">
              <h2 className="text-bold text-[1.2dvw]">Last 30 days</h2>
            </div>
          </div>
        </div>
        <div className="w-[55dvw] h-[30dvh] border-[1px] border-gray-300 rounded-2xl mt-[2dvw] p-[1.5dvw]">
          Leaderboard
        </div>
      </div>
      {/* section 2 */}
      <div className="p-[1.5dvw] w-full h-full">
        <div className="flex justify-between items-center">
          <h1 className="text-bold text-[1.2dvw]">Profile</h1>
          <UserRoundPen />
        </div>
        <div className="flex flex-col h-[23dvh] w-full justify-between text-center items-center">
          <img
            src={`${
              gender === "male" ? "./src/assets/images/male.png" : "./src/assets/images/female.png"
            }`}
            alt="Profile photo"
            className="w-[10dvw]"
          />
          <h1 className="text-[1.5dvw]">Aegon Targaryen</h1>
          <span className="text-gray-400 text-[0.8dvw]">Student</span>
        </div>
        {/* calendar */}
        {/* to modify will do later */}
        <div className="w-full bg-[#e1f4e7] h-[15dvh] flex flex-col rounded-lg mt-[2dvw]">
          <div className="p-[0.7dvw] flex justify-between ">
            <ChevronLeft />
            <h1 className="text-[0.9dvw]">January 2025</h1>
            <ChevronRight />
          </div>
          <CalendarProfile/>
        </div>
        <h1 className="text-[1.2dvw] mt-[2dvh]">Ongoing Course</h1>
        <OngoingCourse course={"React"} topic={"Learning custom hooks"} percentage={"69"} image={"./src/assets/icons/react.png"}/>
        <OngoingCourse course={"React"} topic={"Learning custom hooks"} percentage={"69"} image={"./src/assets/icons/react.png"}/>
        <OngoingCourse course={"React"} topic={"Learning custom hooks"} percentage={"69"} image={"./src/assets/icons/react.png"}/>

        <div className="w-full h-[7dvw] bg-[#e9f1e9] rounded-lg mt-[2dvw]  flex items-center justify-between">
          <div className="flex flex-col items-center ml-[2dvw]">
          <h1 className="text-[2dvw] font-bold">450</h1>
          <span className="text-[0.7dvw] text-gray-400">Points Collected</span>
          </div>
          <img src="./src/assets/icons/trophy.png" alt="" className="h-[9.5dvw] w-[9.5/src/assetsdvw]"/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
