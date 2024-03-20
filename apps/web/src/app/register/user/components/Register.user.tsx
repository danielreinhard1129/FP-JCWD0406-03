"use client";

import axios, { AxiosError } from "axios";

import { baseUrl } from "@/utils/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import YupPassword from "yup-password";
import { IFormUser } from "../../../../../types/form.type";
import { RegisterForm } from "./RegisterForm";

YupPassword(yup);

const RegisterCardUser = () => {
  const router = useRouter();

  const handleSubmit = async (values: IFormUser) => {
    try {
      await axios.post(baseUrl + "/user/register", {
        username: values.username,
        password: values.password,
        email: values.email,
        contact: values.contact,
        alamat: values.alamat,
        roleId: 2,
      });

      toast.success("Register Success", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
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
      <div className="min-h-screen py-5 flex justify-center items-center bg-gradient-to-r ">
        <div className="container max-w-5xl flex flex-col md:flex-row bg-[#233c5a] rounded-md">
          <div className="w-full md:w-1/2 py-[10px] flex flex-col justify-center items-center">
            <h1 className="text-zinc-300 font-bold text-2xl ml-3 mb-5 mt-5">
              Welcome Back!
            </h1>
            <p className="text-center  text-yellow-200 text-sm mx-auto w-full md:w-auto">
              Already have an account ?
              <br /> To keep connected with us please login with your personal
              info
            </p>
            <Link href={"/login"} className=" pt-3">
              <button className="bg-transparent hover:bg-green-600 text-orange-600 font-semibold hover:text-white py-2 px-6 border border-white hover:border-transparent rounded">
                Login
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2 p-5">
            <div className="flex justify-center   shadow-2xl h-full rounded-md">
              <RegisterForm onSubmit={handleSubmit} />
              {/* use RegisterForm here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterCardUser;
