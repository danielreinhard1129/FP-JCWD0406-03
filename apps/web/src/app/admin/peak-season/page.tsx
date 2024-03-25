/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAppSelector } from "@/lib/hooks";
import { baseUrl } from "@/utils/config";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import { RoomOwner } from "../room/page";
import { toast } from "react-toastify";

export interface IPeakSeasonRate {
  id: number;
  startDate: string;
  endDate: string;
  PriceAdjustmentPercentage: number;
  roomId?: number;
  Room: RoomOwner;
}
const PeakSales = () => {
  const id = useAppSelector((state) => state.user.id);
  const [rates, setRates] = useState<IPeakSeasonRate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isAddRate, setIsAddModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null
  );

  const fetchRates = async () => {
    const token = localStorage.getItem("token_auth");
    // const encodedSearchQuery = encodeURIComponent(searchQuery);
    const url = `${baseUrl}/peak-seosen/owner/${id}?page=${currentPage}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const ratesData: IPeakSeasonRate[] = response.data.peakSeasonRates;
      setRates(ratesData);
      setHasNextPage(ratesData.length > 0);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const deleteRates = async (id: number) => {
    const token = localStorage.getItem("token_auth");
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus Rates ini?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`${baseUrl}/peak-seosen/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        fetchRates();
      } catch (error) {
        toast.error("Error deleting property");
      }
    }
  };

  const handleAddPeakSeosenrateClick = (propertyId: number) => {
    setSelectedPropertyId(propertyId);
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      toast.warning("Tidak ada lagi data properti yang tersedia.");
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchRates();
  }, [currentPage]);
  return (
    <div>
      <div className=" py-7 bg-[#e9ebf2] ">
        <button className="  text-white  bg-secondary hover:text-black hover:bg-tertiary px-4 shadow-xl rounded-tr-lg py-3">
          <Link href={"/admin/property/add-property"}>Add property</Link>
        </button>
        <div className=" flex items-center justify-between h-[70px] shadow-lg px-[25px]">
          <div className=" flex items-center rounded-[5px]">
            <input
              type="text"
              //   value={searchQuery}
              //   onChange={handleSearchInputChange}
              className=" text-black bg-quaternary h-[40px] outline-none pl-[13px] w-[350px] rounded-l-lg
           placeholder:text-[14px] leading-[20px] font-normal"
              placeholder=" Searc For.."
            />

            <button
              className="bg-secondary h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-r-lg"
              //   onClick={handleSearch}
              type="button"
            >
              <FaSearch color="black" />
            </button>
          </div>
          <div className=" flex items-center gap-[15px] relative">
            <div className=" flex items-center gap-[25px] border-r-[1px] pr-[25px]">
              <FaRegBell color="black" />
              <FaEnvelope color="black" />
            </div>
          </div>
        </div>
        <div className=" border">
          <div className="overflow-x-auto">
            <table className="min-w-full  divide-quaternary bg-[#6b7280] ">
              <thead className="bg-secondary py-4">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider  "
                  >
                    <div className="flex items-center">
                      <Image
                        src={"/images/icon-property/calender.png"}
                        alt="Add image"
                        width={25}
                        className=""
                        height={25}
                      />
                      Start Dates
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider "
                  >
                    <div className="flex items-center">
                      <Image
                        src={"/images/icon-property/calender2.png"}
                        alt="Add image"
                        width={25}
                        height={25}
                      />
                      End Dates
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider "
                  >
                    <div>
                      <div className="flex items-center">
                        <Image
                          src={"/images/icon-room/room.png"}
                          alt="Add image"
                          width={25}
                          height={25}
                        />
                        Room Types
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <Image
                        src={"/images/icon-property/price.png"}
                        alt="Add image"
                        width={25}
                        height={25}
                      />
                      Price Adjusment
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <Image
                        src={"/images/icon-property/name-property.png"}
                        alt="Add image"
                        width={25}
                        height={25}
                      />
                      Property Name
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <Image
                        src={"/images/icon-property/posisi.png"}
                        alt="Add image"
                        width={25}
                        height={25}
                      />
                      Location
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <Image
                        src={"/images/icon-property/posisi.png"}
                        alt="Add image"
                        width={25}
                        height={25}
                      />
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rates.map((rate) => (
                  <tr key={rate.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-secondary">
                      {rate.startDate}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-secondary">
                      {rate.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-secondary">
                      {rate.Room.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-secondary">
                      Rp.{rate.PriceAdjustmentPercentage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-secondary">
                      {rate.Room.property.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-secondary">
                      {rate.Room.property.location}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <Image
                          src={"/images/icon-property/edit.png"}
                          alt="delete property"
                          width={30}
                          height={30}
                          //   onClick={() => handleEditClick(property.id)}
                        />
                      </button>
                      <button
                        className="mr-4"
                        onClick={() => deleteRates(rate.id)}
                      >
                        <Image
                          src={"/images/icon-property/delete.png"}
                          alt="delete property"
                          width={30}
                          height={30}
                        />
                      </button>
                      <button
                        className="mr-4 text-black font-bold"
                        // onClick={() => handleAddRoomClick(property.id)}
                      >
                        <Image
                          src={"/images/icon-property/add-room.gif"}
                          alt="delete property"
                          width={30}
                          height={30}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between mt-2 mx-4">
          <button
            disabled={currentPage === 1}
            onClick={prevPage}
            className="bg-primary hover:bg-gray-300 px-4 py-2 rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            className="bg-red-600 hover:bg-gray-300 px-4 py-2 rounded-lg 
              !hasNextPage && opacity-50 cursor-not-allowed"
            disabled={!hasNextPage}
          >
            Next
          </button>
        </div>
        {!hasNextPage && (
          <div className="flex justify-center items-center w-[100%] min-h-min">
            <div className=" text-center ">
              <Image
                src={"/images/nodata.png"}
                alt="nodata"
                width={96}
                height={96}
                className="block m-auto"
              />
              <span className="text-[18px] text-[#2554a3] font-semibold">
                Nodata
              </span>
            </div>
          </div>
        )}

        {/* {isAddRoom && (
          <FormAddRoom
            onSubmit={handleAddRoom}
            onCancel={handleAddModalClose}
          />
        )}
        {isEditProperty && (
          <FormLayoutEdit
            propertyData={editPropertyData}
            onClose={handleEditModalClose}
            propertyId={selectedPropertyId!}
          />
        )} */}
      </div>
    </div>
  );
};

export default PeakSales;
