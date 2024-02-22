"use client";

import { baseUrl } from "@/utils/config";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CardForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        return toast("Input cannot be empty !");
      }

      await axios.post(baseUrl + "/user/forgot-password", { email });

      toast.success(" Send Email password successful", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  return (
    <>
      <main className="flex justify-center items-center min-h-screen p-4">
        <div className="flex justify-center items-center bg-gradient-to-r  bg-slate-700 w-full max-w-md mx-auto rounded-lg shadow-md p-6">
          <form className="flex flex-col gap-4 p-10 w-full bg-white rounded-md">
            <h1 className=" heading">Forgot Password</h1>
            <div className="flex justify-center items-center"></div>

            <div>
              <div className="mb-2 block">
                <label
                  htmlFor="email"
                  className=" font-bold underline-offset-2"
                >
                  {" "}
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="yourmail@mail.com"
                  required
                  className="shadow-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <Link href={"/login"}>
              <p className="text-center pr-2 mb-2 md:text-center text-blue-950 text-sm">
                Already remembered ?
              </p>
            </Link>
            <button
              className="w-full bg-gray-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 border rounded"
              type="button"
              onClick={handleForgotPassword}
            >
              Send Email
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CardForgotPassword;
