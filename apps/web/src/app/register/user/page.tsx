import NextTopLoader from "nextjs-toploader";
import React from "react";
import RegisterCardUser from "./components/Register.user";

const page = () => {
  return (
    <div>
      <main className=" mx-auto w-[100%] md:pt-0 lg:pt-0 pt-12 bg-register">
        <NextTopLoader color="#ffffff" showSpinner={false} />
        <RegisterCardUser />
      </main>
    </div>
  );
};

export default page;
