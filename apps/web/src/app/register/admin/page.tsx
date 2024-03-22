import NextTopLoader from "nextjs-toploader";
import React from "react";
import RegisterCardAdmin from "./components/Register.admin";

const page = () => {
  return (
    <div>
      <main className=" mx-auto w-[100%] md:pt-0 lg:pt-0 pt-12  bg-register-admin">
        <NextTopLoader color="#ffffff" showSpinner={false} />
        <RegisterCardAdmin />
      </main>
    </div>
  );
};

export default page;
