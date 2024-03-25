"use client";

import withAuthRedirect from "@/utils/HOC/AdminGuard";
import React from "react";
import TableTransaction from "./components/TableTransaction";

const TransactionPage = () => {
  return (
    <div>
      <TableTransaction />
    </div>
  );
};

export default TransactionPage;
