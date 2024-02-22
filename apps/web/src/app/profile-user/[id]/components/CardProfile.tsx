"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IUser } from "../../../../../types/user.type";
import AddImageForEvents from "./AddImageForProfileUser";

const UserProfile = () => {
  const baseUrl = "http://localhost:8000/api";

  const { id } = useParams();
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleAddImageClick = () => {
    setIsAddImageModalOpen(true);
  };

  const handleAddImageModalClose = () => {
    setIsAddImageModalOpen(false);
  };

  const url = `http://localhost:8000/photo-profile/${userData?.image}`;
  return (
    <div className=" mx-auto  md:items-center lg:items-start  pt-10 container">
      <div className=" mx-6 bg-slate-20 md:w-[50%] lg:w-[80%]  rounded-xl shadow-md  px-8 py-5 my-16 ">
        <div className="md:flex items-center">
          <div className="md:flex-shrink-0 md:px-4 px-25 flex justify-center">
            <Image
              className="   items-center justify-center object-cover md:w-48 w-44 rounded-md"
              src={!userData?.image ? "/images/logo.png" : url}
              alt="Profile Picture"
              width={200}
              height={200}
              key={userData?.image}
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center  md:text-start ">
              {userData?.username || "Loading..."}
            </div>
            <p className="mt-2 text-gray-600 text-center  md:text-start ">
              {userData?.contact || "Loading..."}
            </p>
            <p className="mt-2 text-gray-600 text-center   md:text-start">
              {userData?.email || "Loading..."}
            </p>
            <p className="mt-2 text-gray-600 text-center md:text-start ">
              {userData?.alamat || "Loading..."}
            </p>
            <div className="mt-4">
              <button
                onClick={handleAddImageClick}
                className="bg-slate-950 hover:bg-blue-700 justify-center flex items-center text-white font-semibold py-2 px-4 rounded"
              >
                Add Image
              </button>
            </div>
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
        )}
      </div>
    </div>
  );
};

export default UserProfile;
