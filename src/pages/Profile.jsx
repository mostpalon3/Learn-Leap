import React from "react";
import ProfileSection1 from "../components/Profile/ProfileSection1";
import ProfileSection2 from "../components/Profile/ProfileSection2";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User data:", currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

    console.log("User Logged In:", user);
  return (
    <div className="container flex relative left-[15%] bg-[#f6fbf6] w-[85%] min-h-screen ">
      <ProfileSection1 />
      <ProfileSection2 />
    </div>
  );
}

export default Profile;
