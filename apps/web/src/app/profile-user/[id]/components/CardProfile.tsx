"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import SendEmailForVerifyUser from "@/components/SendEmailForVerifyUser";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { toast } from "react-toastify";
import AddImageForEvents from "./AddImageForProfileUser";

interface Role {
  id: number;
  role: string;
}
interface UserData {
  id: number;
  username: string;
  email: string;
  contact: string;
  alamat: string;
  password: string;
  image: string | null;
  roleId: number;
  role: Role;
}
const UserProfile = () => {
  const baseUrl = "http://localhost:8000/api";
  const { id } = useParams();
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isUserVerified, setIsUserVerified] = useState(false);

  const getDataUser = async () => {
    try {
      const token = localStorage.getItem("token_auth");
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axiosInstance.get(`/user/profile/${id}`);
      setUserData(response.data.user);
      setIsUserVerified(response.data.user.isVerified);
      console.log(response.data.user);
    } catch (error) {
      toast.error("Failed to get user data");
      console.log(error);
    }
  };
  useEffect(() => {
    getDataUser();
  }, []);

  const handleAddImageClick = () => {
    setIsAddImageModalOpen(true);
  };

  const handleAddImageModalClose = () => {
    setIsAddImageModalOpen(false);
  };
  const handleSendEmailModalOpen = () => {
    setIsSendEmailModalOpen(true);
  };

  const handleSendEmailModalClose = () => {
    setIsSendEmailModalOpen(false);
  };

  const url = `http://localhost:8000/photo-profile/${userData?.image}`;
  return (
    <>
      <div className="mx-auto max-w-xl sm:mx-auto ">
        <div className="flex items-center justify-center">
          <h1 className="font-semibold text-xl py-3">Information Profile</h1>
        </div>
      </div>
      <div className="mx-auto max-w-[100%] sm:max-w-xl md:max-w-xl lg:max-w-3xl xl:max-w-4xl">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700  flex justify-center items-center">
          <div className="flex flex-col items-center py-10 ">
            <Image
              className=" object-cover"
              src={!userData?.image ? "/images/no-profile.svg" : url}
              alt="Profile Picture"
              width={100}
              height={100}
              key={userData?.image}
            />

            <button
              onClick={handleAddImageClick}
              className=" bg-blue-900 hover:bg-blue-700 justify-center flex items-center text-white font-semibold mt-4 py-1 px-2 rounded"
            >
              Add Image
            </button>
            <h5 className="mb-1 mt-1 text-xl font-medium text-gray-900 dark:text-white">
              {userData?.email}{" "}
            </h5>
            <span className="text-2xl text-blue-900 dark:text-gray-400">
              {userData?.role.role}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 ">
          <div className="p-8 border-x-[1px] border-y-[2px] rounded-md">
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                value={userData?.email}
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {isUserVerified ? (
                <button className=" bg-blue-900  justify-center flex items-center text-white font-normal mt-2 py-1 px-3 rounded">
                  User Verified
                </button>
              ) : (
                <button
                  onClick={handleSendEmailModalOpen}
                  className="bg-slate-950 hover:bg-blue-900 justify-center flex items-center text-white font-normal mt-2 py-1 px-3 rounded"
                >
                  Send Email for Verification
                </button>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                value={userData?.username}
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact
              </label>
              <input
                type="text"
                value={userData?.contact}
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>{" "}
            <div className="mb-5">
              {" "}
              <label
                htmlFor="base-input"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                value={userData?.alamat}
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>{" "}
          </div>{" "}
        </div>
      </div>
      {isAddImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden max-w-md w-full">
            <div className="relative h-64">
              <Image
                layout="fill"
                src="/images/h2.png"
                alt="Modal Background"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-3xl font-semibold">
                  Add Image
                </div>
              </div>
            </div>
            <div className="p-6">
              <AddImageForEvents />
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAddImageModalClose}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      {isSendEmailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" rounded-lg overflow-hidden max-w-md w-full">
            <div className="p-6">
              <SendEmailForVerifyUser />
              <div className=" md:mt-[-100px] mt-[-120px] flex justify-end">
                <button
                  onClick={handleSendEmailModalClose}
                  className=" text-red-500 font-extralight py-1 px-2 rounded-full"
                >
                  <IoMdCloseCircleOutline className=" font-extralight" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
