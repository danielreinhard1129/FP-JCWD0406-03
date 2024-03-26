/* eslint-disable react-hooks/exhaustive-deps */
"use client";


import { useAppSelector } from '@/lib/hooks';
import { baseUrl } from '@/utils/config';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

import { FaEnvelope, FaRegBell, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Property } from '../../../../types/properties.type';
import AddImageForRoom from './components/AddImageRoom';
import { RoomStatus, RoomType } from '../../../../types/room.type';



import { useEffect, useRef, useState } from "react";


import EditRoomForm, { EditRoom } from "./components/EditRoom";
import FormPeakSeosenRate, {
  AddPeakSeosenRate,
} from "./components/PeakSeosenRate";



export interface RoomPicture {
  id: number;
  roomId: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomOwner {
  id: number;
  propertyId: number;
  type: RoomType;
  price: number;
  description: string;
  bedroom: string;
  bathroom: string;
  spaciousRoom: string;
  createdAt: Date;
  updatedAt: Date;
  status: RoomStatus;
  images: RoomPicture[];
  property: Property;
}

const GetRoomOwner = () => {
  const id = useAppSelector((state) => state.user.id);
  const [rooms, setRooms] = useState<RoomOwner[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isEditRoom, setIsEditModalOpen] = useState(false);
  const [editRoomData, setEditRoomData] = useState<RoomOwner | null>(null);
  const editFormRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);
  const [isAddRate, setIsAddModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const fetchRooms = async () => {
    const token = localStorage.getItem("token_auth");

    let url = `${baseUrl}/room/owner/${id}?page=${currentPage}`;

    if (searchQuery) {
      if (
        searchQuery === "AVAILABLE" ||
        searchQuery === "OCCUPIED" ||
        searchQuery === "RENOVATION"
      ) {
        url += `&status=${encodeURIComponent(searchQuery)}`;
      } else {
        url += `&type=${encodeURIComponent(searchQuery)}`;
      }
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedRooms = response.data.rooms;
      setRooms(fetchedRooms);
      setHasNextPage(fetchedRooms.length > 0);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleEditClick = (roomId: number) => {
    const roomToEdit = rooms.find((room) => room.id === roomId);
    if (roomToEdit) {
      setEditRoomData(roomToEdit);
      setIsEditModalOpen(true);
      setShouldScroll(true);
    } else {
      console.error("Room not found for editing");
    }
  };

  useEffect(() => {
    if (shouldScroll && editFormRef.current) {
      editFormRef.current.scrollIntoView({
        behavior: "smooth",
      });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  const handleAddPeakSeosenrate = async (
    peakSeosenrateData: AddPeakSeosenRate
  ) => {
    const token = localStorage.getItem("token_auth");
    try {
      if (!selectedRoomId) {
        throw toast.error("Selected property ID is not set.");
      }
      await axios.post(
        `${baseUrl}/peak-seosen/room/${selectedRoomId}`,
        peakSeosenrateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleAddModalClose();
      toast.success("Add Peak Seosen rate successfully");
      fetchRooms();
    } catch (error) {
      toast.error("Failed to add room");
    }
  };

  const handleAddPeakSeosenrateClick = (roomId: number) => {
    setSelectedRoomId(roomId);
    setIsAddModalOpen(true);
    setShouldScroll(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditRoom = async (roomData: EditRoom) => {
    const token = localStorage.getItem("token_auth");
    const roomToEdit = editRoomData;
    if (roomToEdit) {
      const { id } = roomToEdit;
      try {
        await axios.put(`${baseUrl}/room/${id}`, roomData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.info("Edit Room successful", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });

        fetchRooms();
        setIsEditModalOpen(false);

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error updating room:", error);
        toast.error("Failed to update room");
      }
    }
  };

  const updateRoomsAfterImageUpload = (roomIdToUpdate: number) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomIdToUpdate) {
        const updatedImages = [
          ...room.images,
          { id: Math.random(), roomId: roomIdToUpdate } as RoomPicture,
        ];
        return { ...room, images: updatedImages };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  const deleteRoom = async (id: number) => {
    const token = localStorage.getItem("token_auth");
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus Room ini?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`${baseUrl}/room/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        fetchRooms();
      } catch (error) {
        toast.error("Error deleting property");
      }
    }
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
  const handleFetchRooms = () => {
    fetchRooms();
  };

  const handleSearch = () => {
    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, [currentPage]);

  return (
    <div className=" py-7 bg-[#e9ebf2] ">
      <button className="  text-white  bg-secondary hover:text-black hover:bg-tertiary px-4 shadow-xl rounded-tr-lg py-3">
        <Link href={"/admin/property/add-property"}>Add property</Link>
      </button>
      <div className=" flex items-center justify-between h-[70px] shadow-lg px-[25px]">
        <div className=" flex items-center rounded-[5px]">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className=" text-black bg-quaternary h-[40px] outline-none pl-[13px] w-[350px] rounded-l-lg
           placeholder:text-[14px] leading-[20px] font-normal"
            placeholder=" Search By Type or Status"
          />

          <button
            className="bg-secondary h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-r-lg"
            onClick={handleSearch}
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
                      src={"/images/icon-property/type.png"}
                      alt="Add image"
                      width={25}
                      height={25}
                    />
                    Type
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider "
                >
                  <div>
                    <div className="flex items-center">
                      <Image
                        src={"/images/icon-room/status.png"}
                        alt="Add image"
                        width={25}
                        height={25}
                      />
                      Status
                    </div>
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
                      Property
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider "
                >
                  <div className="flex items-center">
                    <Image
                      src={"/images/icon-room/price.png"}
                      alt="Add image"
                      width={25}
                      height={25}
                    />
                    Price
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <Image
                      src={"/images/icon-room/bedroom.png"}
                      alt="Add image"
                      width={25}
                      className=""
                      height={25}
                    />
                    Bedroom
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <Image
                      src={"/images/icon-room/bathroom.png"}
                      alt="Add image"
                      width={25}
                      height={25}
                    />
                    Bathroom
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <Image
                      src={"/images/icon-room/spacius.png"}
                      alt="Add image"
                      width={25}
                      height={25}
                    />
                    spaciousRoom
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-secondary">
                    {room.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-secondary">
                    {room.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-secondary">
                    {room.property.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-secondary">
                    {room.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-secondary">
                    {room.bedroom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-secondary">
                    {room.bathroom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-secondary">
                    {room.spaciousRoom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Image
                        src={"/images/icon-room/sale.gif"}
                        alt=" peak seosen rate"
                        width={30}
                        height={30}
                        onClick={() => handleAddPeakSeosenrateClick(room.id)}
                        quality={100}
                      />
                    </button>
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      onClick={() => handleEditClick(room.id)}
                    >
                      <Image
                        src={"/images/icon-property/edit.png"}
                        alt="edit room"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button
                      className="mr-4"
                      onClick={() => deleteRoom(room.id)}
                    >
                      <Image
                        src={"/images/icon-property/delete.png"}
                        alt="delete room"
                        width={30}
                        height={30}
                      />
                    </button>
                    <span className=" text-gray-700 font-semibold">
                      {room.images.length}
                    </span>
                    {/* addImage */}
                    <AddImageForRoom
                      fetchRooms={handleFetchRooms}
                      roomId={room.id}
                      updateRooms={updateRoomsAfterImageUpload}
                    />
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
          className={`bg-red-600 hover:bg-gray-300 px-4 py-2 rounded-lg ${
            !hasNextPage && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>

      {isEditRoom && editRoomData && (
        <div ref={editFormRef}>
          <EditRoomForm
            roomData={editRoomData}
            onCancel={() => setIsEditModalOpen(false)}
            onSubmit={handleEditRoom}
          />
        </div>
      )}
      {isAddRate && (
        <div ref={editFormRef}>
          <FormPeakSeosenRate
            onSubmit={handleAddPeakSeosenrate}
            onCancel={handleAddModalClose}
          />
        </div>
      )}
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
    </div>
  );
};

export default GetRoomOwner;
