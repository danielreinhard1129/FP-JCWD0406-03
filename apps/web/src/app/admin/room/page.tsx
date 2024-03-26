/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useAppSelector } from '@/lib/hooks';
import { baseUrl } from '@/utils/config';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaRegBell, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Property } from '../../../../types/properties.type';
import AddImageForRoom from './components/AddImageRoom';
import { RoomStatus, RoomType } from '../../../../types/room.type';

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
  const [isAddRoom, setIsAddModalOpen] = useState(false);

  const fetchRooms = async () => {
    const token = localStorage.getItem('token_auth');
    try {
      const response = await axios.get(
        `http://localhost:8000/api/room/owner/${id}?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const fetchedRooms = response.data.rooms;
      setRooms(fetchedRooms);
      setHasNextPage(fetchedRooms.length > 0);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const deleteRoom = async (id: number) => {
    const token = localStorage.getItem('token_auth');
    const confirmDelete = window.confirm(
      'Apakah Anda yakin ingin menghapus properti ini?',
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
        toast.error('Error deleting property');
      }
    }
  };

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      toast.warning('Tidak ada lagi data properti yang tersedia.');
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchRooms();
  }, [currentPage]);

  return (
    <div className=" py-7 bg-[#e9ebf2] ">
      <button className="  text-white  bg-secondary hover:text-black hover:bg-tertiary px-4 shadow-xl rounded-tr-lg py-3">
        <Link href={'/admin/property/add-property'}>Add property</Link>
      </button>
      <div className=" flex items-center justify-between h-[70px] shadow-lg px-[25px]">
        <div className=" flex items-center rounded-[5px]">
          <input
            type="text"
            className=" text-black bg-quaternary h-[40px] outline-none pl-[13px] w-[350px] rounded-l-lg
           placeholder:text-[14px] leading-[20px] font-normal"
            placeholder=" Searc For.."
          />
          <div className="bg-secondary h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-r-lg">
            <FaSearch color="black" />
          </div>
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
                      src={'/images/icon-property/type.png'}
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
                        src={'/images/icon-room/status.png'}
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
                        src={'/images/icon-room/room.png'}
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
                      src={'/images/icon-room/price.png'}
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
                      src={'/images/icon-room/bedroom.png'}
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
                      src={'/images/icon-room/bathroom.png'}
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
                      src={'/images/icon-room/spacius.png'}
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
                        src={'/images/icon-property/edit.png'}
                        alt="delete property"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button
                      className="mr-4"
                      onClick={() => deleteRoom(room.id)}
                    >
                      <Image
                        src={'/images/icon-property/delete.png'}
                        alt="delete property"
                        width={30}
                        height={30}
                      />
                    </button>
                    <span className=" text-gray-700 font-semibold">
                      {room.images.length}
                    </span>
                    {/* addImage */}
                    <AddImageForRoom roomId={room.id} />
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
            !hasNextPage && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>
      {!hasNextPage && (
        <div className="flex justify-center items-center w-[100%] min-h-min">
          <div className=" text-center ">
            <Image
              src={'/images/nodata.png'}
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
