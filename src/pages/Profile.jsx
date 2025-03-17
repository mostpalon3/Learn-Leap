import React from "react";
import ProfileSection1 from "../components/Profile/ProfileSection1";
import ProfileSection2 from "../components/Profile/ProfileSection2";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

    console.log("User Logged In:", user);
  return (
    <div className="container flex relative left-[15%] bg-[#f6fbf6] w-[85%] min-h-screen ">
      <ProfileSection1 user={user}/>
      <ProfileSection2 user={user}/>
    </div>
  );
}

export default Profile;
