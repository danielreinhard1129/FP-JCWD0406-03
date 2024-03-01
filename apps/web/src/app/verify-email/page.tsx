"use client";

import { baseUrl } from "@/utils/config";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const handleVerifyEmail = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axiosInstance.patch("/user/verification");
      const { id } = response.data.user;
      setUserId(id);

      toast.success("Verify Email successful", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    } catch (error) {
      console.log(error);

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
      router.push(`/profile-user/${userId}`);
    }
  }, [userId]);
  return (
    <main className="flex justify-center items-center min-h-screen bg-banner p-5 ">
      <div className="flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-full max-w-md mx-auto rounded-lg shadow-md p-6">
        <form className="flex flex-col gap-4 p-10 w-full">
          <h1 className="text-slate-700 font-bold text-2xl  justify-center flex items-center">
            Verify Email
          </h1>
          <div className="flex justify-center items-center"></div>

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
