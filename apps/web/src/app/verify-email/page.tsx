"use client";

import { logoutAction } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { baseUrl } from "@/utils/config";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const token = searchParams.get("token");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const dispatch = useAppDispatch();

  const handleVerifyEmail = async () => {
    try {
      if (!password) {
        return toast.error("Inputs cannot be empty");
      }
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axiosInstance.patch("/user/verification", {
        password,
      });
      const { id } = response.data.user;
      setUserId(id);
      toast.success("Verify Email successful", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
      dispatch(logoutAction());
      localStorage.removeItem("token_auth");
      router.push("/login");
    } catch (error) {
      alert("Error");
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  const handleSubmit = () => {
    if (token) {
      handleVerifyEmail();
    }
  };

  useEffect(() => {
    if (userId) {
      router.push(`/login`);
    }
  }, [router, userId]);
  return (
    <main
      className="flex justify-center items-center min-h-screen bg-register-admin
     p-5 "
    >
      <div className="flex justify-center items-center bg-gradient-to-r from-primary via-pink-500 to-red-500 w-full max-w-md mx-auto rounded-lg shadow-md p-6">
        <form className="flex flex-col gap-4 p-10 w-full">
          <h1 className="text-white shadow-md font-bold text-2xl  justify-center flex items-center">
            Verify Email
          </h1>
          <div className="flex justify-center items-center"></div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="password" className="mb-2 text-white block">
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
          <button
            disabled={!token}
            onClick={handleSubmit}
            type="button"
            className={`${
              !token && "opacity-50 cursor-not-allowed"
            } bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default EmailVerify;
