import React from "react";
import { getFormattedTime } from "../TimeFormat.mjs";
import * as lucide from "lucide-react";
import clsx from "clsx";

// Importing images
import profileVector from "../../assets/images/profile-vector.png";
import { CircularProgress } from "../CircularProgress";
import Leaderboard from "../Leaderboard";
import CircularProgressChart from "../CircularProgressChart";

const ProfileSection1 = () => {
  const schedule = {
    1: {
      index: 0,
      subject: "physics",
      color: "amber",
    },
    2: {
      index: 1,
      subject: "chemistry",
      color: "pink",
    },
    3: {
      index: 2,
      subject: "maths",
      color: "green",
    },
  };
  return (
    <>
      <div className="border-r-[0.1px] border-gray-400 w-[72%] p-[3dvw] pt-[4vh] h-screen overflow-y-auto overflow-x-hidden flex-shrink-0 scroll-bar scroll-smooth">
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
            src={profileVector}
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
            <div className="flex flex-col ">
              {Object.values(schedule).map((item) => {
                const Icon =
                  lucide[
                    item.subject.charAt(0).toUpperCase() + item.subject.slice(1)
                  ] || lucide["BookOpen"];
                return (
                  <div
                    className="flex items-center mt-[2vh] space-x-4"
                    key={item.index}
                  >
                    {/* Time Block */}
                    <span
                      className={clsx(
                        `flex items-center justify-center w-[8vw] h-[3vw] text-[1vw] rounded-3xl`,
                        {
                          "bg-amber-200": item.color === "amber",
                          "bg-pink-200": item.color === "pink",
                          "bg-green-200": item.color === "green",
                        }
                      )}
                    >
                      {getFormattedTime(item.index)}
                    </span>

                    {/* Subject Block */}
                    <span className="flex items-center justify-center w-[20vw] h-[3vw] rounded-2xl bg-gray-200 shadow-md">
                      {Icon &&
                        React.createElement(Icon, {
                          size: 24,
                          className: "mx-2 ",
                        })}
                      <span className="ml-[1vw] text-[1.1vw]">
                        {item.subject.charAt(0).toUpperCase() +
                          item.subject.slice(1)}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-[20dvw] h-[30dvh] border-[1px] border-gray-300 rounded-2xl p-[1.5dvw]">
            <div className="flex justify-between items-center">
              <h2 className="text-bold text-[1.2dvw]">Last 30 days</h2>
            </div>
            <div className="flex justify-center items-center w-full mt-[3dvh]">
              {/* <CircularProgress
                percentage={69}
                size="7dvw"
                progressColor="#66D2CE"
                text={"Task Done"}
              /> */}
              <CircularProgressChart percentage={23} label="Hours Target" />
              <CircularProgressChart percentage={69} label="Course" />
            </div>
            <div className="text-gray-400 text-center mt-[3dvh]">
              View Graph
            </div>
          </div>
        </div>

        <div className="w-[55dvw] h-[30dvh] border-[1px] border-gray-300 rounded-2xl mt-[2dvw] p-[1.5dvw]">
          <h1 className="text-[1.5dvw]">Leaderboard</h1>
          <Leaderboard />
        </div>
      </div>
    </>
  );
};

export default ProfileSection1;
