import Link from "next/link";
import React from "react";

const Button1 = () => {
  return (
    <div>
      <Link
        href="/register"
        className="relative hidden lg:inline-flex items-center justify-center px-10 py-3 overflow-hidden font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
      >
        <span className=" absolute w-0 h-0 transition-all duration-500 ease-out bg-green-600 rounded-full group-hover:w-56 group-hover:h-56 "></span>
        <span className=" absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-t from-transparent via-transparent to-gray-700"></span>
        <span className=" relative"> Book Now</span>
      </Link>
    </div>
  );
};

export default Button1;
