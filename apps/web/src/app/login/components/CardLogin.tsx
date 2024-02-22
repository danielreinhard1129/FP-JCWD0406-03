/* eslint-disable @next/next/no-img-element */

"use client"; // Fix typo

import { loginAction } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { baseUrl } from "@/utils/config";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return toast.error("Inputs cannot be empty");
      }
      const { data } = await axios.post(baseUrl + "/user/login", {
        email,
        password,
      });

      dispatch(loginAction(data.data));
      localStorage.setItem("token_auth", data.token);

      toast.success("Login successful", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
      setTimeout(() => {
        if (data.data.roleId === 1) {
          // Admin redirects to "/admin"
          router.push("/admin");
        } else if (data.data.roleId === 2) {
          // User redirects to "/"
          router.push("/");
        } else {
          toast.error("Invalid role or no role assigned");
        }
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;

        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r ">
        <div className="container max-w-4xl flex flex-col md:flex-row bg-slate-700 rounded-md mx-4">
          <div className="w-full md:w-1/2 pl-[10px] flex flex-col justify-center items-center">
            <h1 className="text-zinc-300 font-bold text-2xl mt-5">
              Hello, Friends !
            </h1>
            <p className="text-center pr-2 md:text-center text-yellow-200 text-sm">
              Please Enter your personal details
              <br /> and start journey with us !
            </p>
            <Link href={"/register"}>
              <button className="mt-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Sign Up
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2 p-5">
            <div className="bg-white h-full rounded-md">
              <form
                className="flex max-w-md flex-col gap-4 p-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <div className="flex justify-center items-center">
                  <h1 className="text-slate-700 font-bold text-2xl ">
                    Sign In Here
                  </h1>
                </div>

                <div>
                  <div className="mb-2 block">
                    <label htmlFor="email" className="mb-2 block">
                      Email
                    </label>
                  </div>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="yourmail@mail.com"
                    required
                    className="shadow-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <label htmlFor="password" className="mb-2 block">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="shadow-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
                <Link href={"/forgot-password"}>
                  <p className="text-center pr-2 md:text-center text-blue-950 text-sm">
                    Forgot Password ?
                  </p>
                </Link>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
