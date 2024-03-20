"use client";

import withAdminRedirect from "@/utils/HOC/AdminGuard";
import React from "react";
import SeacrhItems from "./components/SeacrhItems";
import HeroSection from "./components/HeroSection";

const AdminPage = () => {
  return (
    <div className=" ">
      <div className=" basis-[80%] border">
        <SeacrhItems />
        <HeroSection />
      </div>
    </div>
  );
};

export default withAdminRedirect(AdminPage);
