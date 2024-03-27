"use client";

import { baseUrl } from "@/utils/config";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import {
  IPropertyAdd,
  PropertyType,
} from "../../../../../types/formPropertyAdd.type";
import { useAppSelector } from "@/lib/hooks";
import { PropertyOwner } from "../page";
import PropertyImageBox from "./ImageProperty";

const FormLayoutEdit = ({
  propertyData,
  onClose,
  propertyId,
  onEditSuccess,
}: {
  propertyData: PropertyOwner | null;
  onClose: () => void;
  propertyId: number;
  onEditSuccess: () => void;
}) => {
  const ownerId = useAppSelector((state) => state.user.id);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const [formData, setFormData] = useState<IPropertyAdd>({
    name: propertyData ? propertyData.name : "",
    location: propertyData ? propertyData.location : "",
    availableStartDate: propertyData ? propertyData.availableStartDate : "",
    availableEndDate: propertyData ? propertyData.availableEndDate : "",
    maxGuest: propertyData ? propertyData.maxGuest : 0,
    description: propertyData ? propertyData.description : "",
    about: propertyData ? propertyData.about : "",
    type: propertyData ? propertyData.type : PropertyType.APARTMENT,
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token_auth");
      if (!token) {
        throw new Error("Token not found");
      }
      await axios.patch(
        `${baseUrl}/property/edit/${propertyId}/${ownerId}`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onEditSuccess();
      toast.info("Property Edit successfully!", {
        position: "top-right",
        autoClose: 1600,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Error Edit property");
      console.error("Error adding property:", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const newValue = name === "maxGuest" ? parseInt(value) : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  return (
    <div className=" bg-[#f1f5f9]  ">
      <div className=" w-full">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border-[#E2E8F0] bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-[#E2E8F0] px-7 py-4 ">
              <h3 className="text-lg font-semibold mb-2 text-center text-gray-600">
                Edit Property
              </h3>
            </div>
            <form className=" mx-5 " onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Name Property
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition "
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    Available Start Date{" "}
                    <span className="text-[#DC3545]">*</span>
                  </label>
                  <input
                    type="date"
                    name="availableStartDate"
                    value={formData.availableStartDate}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    Available End Date <span className="text-[#DC3545]">*</span>
                  </label>
                  <input
                    type="date"
                    name="availableEndDate"
                    value={formData.availableEndDate}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    maxGuest
                  </label>
                  <input
                    type="number"
                    name="maxGuest"
                    value={formData.maxGuest}
                    onChange={handleChange}
                    placeholder="Select MaximumGuest"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* select Type property*/}
                <div className="mb-4">
                  <label className="mb-1 block text-black dark:text-white">
                    {" "}
                    Select Property
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary text-black
                       "
                    >
                      <option value="" disabled className="text-black">
                        Select your PropertyType
                      </option>
                      <option value="APARTMENT" className="text-black">
                        APARTMENT
                      </option>
                      <option value="VILLA" className="text-black">
                        VILLA
                      </option>
                      <option value="TOWNHOUSE" className="text-black">
                        TOWNHOUSE
                      </option>
                      <option value="OTHER" className="text-black">
                        OTHER
                      </option>
                      <option value="CONDO" className="text-black">
                        CONDO
                      </option>
                      <option value="COTTAGE" className="text-black">
                        COTTAGE
                      </option>
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    about
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded w-full text-center"
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex mt-2 w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Edit Property
                </button>
              </div>
            </form>
          </div>
        </div>
        {propertyData && propertyData.images && propertyData.images.length > 0 && (
          <div className="flex justify-center items-">
            <PropertyImageBox images={propertyData.images} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormLayoutEdit;
