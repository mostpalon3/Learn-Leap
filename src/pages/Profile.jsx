import React from "react";
import ProfileSection1 from "../components/Profile/ProfileSection1";
import ProfileSection2 from "../components/Profile/ProfileSection2";

function Profile() {
  return (
    <div className="container flex relative left-[15%] bg-[#f0f9f0] w-[85%] min-h-screen ">
      <ProfileSection1 />
      <ProfileSection2 />
    </div>
  );
}

export default Profile;
