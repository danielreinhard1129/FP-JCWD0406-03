/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className=" fixed  top-0 left-0 right-0 z-[100000] h-[13vh] bg-blue-900 ">
      <div className="w-[95%] md:w-[80%] mx-auto h-[100%] flex items-center justify-between">
        {/* logo */}
        <Link href="/" className="flex items-center text-[25px]">
          <Image src="/images/logo.png" alt="logo" width={40} height={30} />
          <h1 className=" text-white font-bold">
            Rumah.<span className=" text-orange-500">123</span>{" "}
          </h1>
        </Link>
        <div className="h-[50%] hidden flex-[0.7] overflow-hidden bg-gray-200 rounded-md md:flex items-center">
          <input
            type="text"
            placeholder="Search Event (eg. Colll play Conser)"
            className="block pl-[0.5rem] w-[90%] outline-none mx-auto h-[100%] bg-gray-200"
          />

          <MagnifyingGlassIcon className="w-[1.8rem] h-[1.8rem] mr-[1.4rem] cursor-pointer" />
        </div>
        {/* login dropdown */}
        <div className="relative md:pr-0 pr-10 ">
          <UserIcon
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-[2rem] h-[2rem] text-white cursor-pointer"
          />
          {showDropdown && (
            <div className="absolute left-0 mt-2 w-35 bg-white rounded-md overflow-hidden shadow-xl z-10">
              <Link
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                onClick={() => setShowDropdown(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                onClick={() => setShowDropdown(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
