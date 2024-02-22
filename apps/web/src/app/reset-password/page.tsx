"use client";
import { baseUrl } from "@/utils/config";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const CardResetPassword = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = searchParams.get("token");

  const handleResetPassword = async () => {
    try {
      if (!password || !confirmPassword) {
        return toast.error("Input cannot be empty !");
      }

      if (password !== confirmPassword) {
        return toast.error("Passwords do not match!");
      }

      await axios.patch(
        baseUrl + "/user/reset-password",
        {
          password,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(" Reset password successful", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });

      router.push("/login");
    } catch (error) {
      console.log(error);

      alert("Error");
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-banner p-5 ">
      <NextTopLoader color="#000" showSpinner={false} />
      <div className="flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-full max-w-md mx-auto rounded-lg shadow-md p-6">
        <form className="flex flex-col gap-4 p-10 w-full">
          <h1 className="text-slate-700 font-bold text-2xl ">Reset Password</h1>
          <div className="flex justify-center items-center"></div>

          <div>
            <div className="mb-2 block">
              <label htmlFor="password" className="mb-2 block">
                Your Password
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
          <div>
            <div className="mb-2 block">
              <label htmlFor="password" className="mb-2 block">
                Confirm Password
              </label>
            </div>
            <div className="relative">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="shadow-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <button
            onClick={handleResetPassword}
            type="button"
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default CardResetPassword;
