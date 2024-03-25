"use client";

import withAuth from "@/utils/HOC/ProfileGuard";
import UserProfile from "./components/CardProfile";

const Profile = () => {
  return (
    <main className=" items-center  pt-14   ">
      <UserProfile />
    </main>
  );
};

export default withAuth(Profile);
