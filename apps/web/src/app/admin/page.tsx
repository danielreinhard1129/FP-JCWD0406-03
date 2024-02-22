"use client";

import withAuthRedirect from "@/utils/HOC/AdminGuard";
import React from "react";

const AdminPage = () => {
  return <div>AdminPage</div>;
};

export default withAuthRedirect(AdminPage);
