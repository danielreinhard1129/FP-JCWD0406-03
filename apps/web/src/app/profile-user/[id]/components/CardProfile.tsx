/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import { useAppSelector } from "@/lib/hooks";
import { toast } from "react-toastify";
import AddImageForEvents from "./AddImageForProfileUser";
import { string } from "yup";

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
  const user = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const router = useRouter();

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
    } catch (error) {
      toast.error("Failed to get user data");
      console.log(error);
    }
  };

  const handleVerifyEmailUser = async () => {
    try {
      const token = localStorage.getItem("token_auth");
      const response = await axios.post(
        baseUrl + "/user/send-email",
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.done("Send Email Verify successful");
      router.push(`/profile-user/${user.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  const handleConfirmEdit = async () => {
    try {
      const token = localStorage.getItem("token_auth");
      const response = await axios.patch(
        `${baseUrl}/user/update/${id}`,
        {
          email: userData?.email,
          username: userData?.username,
          contact: userData?.contact,
          alamat: userData?.alamat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User Update SuccesFully", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
      if (response.data.user.email !== userData?.email) {
        setIsUserVerified(false);

        toast.success("Please verify your new email address");
      }

      getDataUser();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevUserData: any) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getDataUser();
  }, [id]);

  const handleAddImageClick = () => {
    setIsAddImageModalOpen(true);
  };

  const handleAddImageModalClose = () => {
    setIsAddImageModalOpen(false);
  };

  const url = `http://localhost:8000/photo-profile/${userData?.image}`;
  return (
    <>
      <div className="mx-auto max-w-xl sm:mx-auto pt-12 md:pt-6 ">
        <div className="flex items-center justify-center">
          <h1 className="heading">Information Profile</h1>
        </div>
        <div className="mx-auto max-w-[100%] sm:max-w-xl md:max-w-xl lg:max-w-3xl xl:max-w-4xl">
          <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700  flex justify-center items-center">
            <div className="flex flex-col items-center py-10 ">
              <Image
                className=" object-cover rounded-lg"
                src={!userData?.image ? "/images/no-profile.svg" : url}
                alt="Profile Picture"
                width={100}
                height={100}
                key={userData?.image}
              />

              <button
                onClick={handleAddImageClick}
                className=" bg-primary hover:bg-secondary justify-center flex items-center text-white font-semibold mt-4 py-1 px-2 rounded"
              >
                Add Image
              </button>
              <h5 className="mb-1 mt-1 text-xl font-medium text-gray-900 dark:text-white">
                {userData?.email}
              </h5>
              <span className="text-2xl text-blue-900 dark:text-gray-400">
                {userData?.role.role}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 pb-8 ">
            <div className="p-8 border-x-[1px] border-y-[2px] rounded-md">
              <div className="mb-5">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={userData?.email}
                  onChange={handleInputChange}
                  id="email-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary input-shadow"
                />
                {!isUserVerified && (
                  <button
                    onClick={handleVerifyEmailUser}
                    value={user.email}
                    className="bg-secondary hover:bg-primary justify-center flex items-center text-white font-normal mt-2 py-1 px-3 rounded"
                  >
                    Verification
                  </button>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  value={userData?.username}
                  id="name-input"
                  className="bg-gray-50 border input-shadow border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={userData?.contact}
                  onChange={handleInputChange}
                  id="contact-input"
                  className="bg-gray-50 border input-shadow border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>{" "}
              <div className="mb-5">
                {" "}
                <label
                  htmlFor="base-input"
                  className="block mb-1 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="alamat"
                  value={userData?.alamat}
                  onChange={handleInputChange}
                  id="address-input"
                  className="bg-gray-50 border input-shadow border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>{" "}
              <div className="items-center justify-center w-[100%]">
                <button
                  onClick={handleConfirmEdit}
                  className="bg-primary hover:bg-secondary w-[100%] text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
        {isAddImageModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden max-w-md w-full">
              <div className="relative h-64">
                <Image
                  className=" object-cover"
                  src={!userData?.image ? "/images/no-profile.svg" : url}
                  alt="Profile Picture"
                  layout="fill"
                  key={userData?.image}
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
      </div>
    </>
  );
};

export default UserProfile;
