/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useAppSelector } from '@/lib/hooks';
import { baseUrl } from '@/utils/config';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

<<<<<<< HEAD
import Link from "next/link";
import FormAddRoom, { AddRoom } from "./components/AddRoomProperty";

import { PropertyType } from "../../../../types/formPropertyAdd.type";
import FormLayoutEdit from "./components/EditProperty";
=======
import { FaEnvelope, FaRegBell, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AddImageForProperty from './components/AddImageProperty';

import Link from 'next/link';
import FormAddRoom, { AddRoom } from './components/AddRoomProperty';
import ReplyReview from './components/ReplyReview';
import FormLayoutEdit from './components/EditProperty';
import { PropertyType } from '../../../../types/formPropertyAdd.type';
>>>>>>> develop

export interface Room {
  id: number;
  propertyId: number;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyPicture {
  id: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  propertyId?: number;
  length: number;
  0: any;
}
export interface PropertyOwner {
  id: number;
  name: string;
  description: string;
  about: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  type: PropertyType;
  images: PropertyPicture[];
  location: string;
  maxGuest: number;
  availableStartDate: string;
  availableEndDate: string;
  Room: Room[];
  Transaction: any | null;
}

const GetPropertyOwner = () => {
  const id = useAppSelector((state: { user: { id: any } }) => state.user.id);
  const [properties, setProperties] = useState<PropertyOwner[]>([]);
  const [editPropertyData, setEditPropertyData] =
    useState<PropertyOwner | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);
  const editFormRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isEditProperty, setIsEditModalOpen] = useState(false);
  const [isAddRoom, setIsAddModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null,
  );

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
  };

  const fetchProperties = async () => {
    const token = localStorage.getItem('token_auth');
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    const url = `${baseUrl}/property/owner/${id}?page=${currentPage}&search=${encodedSearchQuery}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const propertiesData: PropertyOwner[] = response.data.properties;
      setProperties(propertiesData);
      setHasNextPage(propertiesData.length > 0);
    } catch (error) {
      console.error('Error fetching properties:', error);
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

  const deleteProperty = async (id: number) => {
    const token = localStorage.getItem('token_auth');
    const confirmDelete = window.confirm(
      'Apakah Anda yakin ingin menghapus properti ini?',
    );

    if (confirmDelete) {
      try {
        await axios.delete(`${baseUrl}/property/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const handleAddRoomClick = (propertyId: number) => {
    setSelectedPropertyId(propertyId);
    setIsAddModalOpen(true);
    setShouldScroll(true);
  };

  useEffect(() => {
    if (shouldScroll && editFormRef.current) {
      editFormRef.current.scrollIntoView({
        behavior: 'smooth',
      });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditClick = (propertyId: number) => {
    const propertyToEdit = properties.find(
      (property) => property.id === propertyId,
    );
    if (propertyToEdit) {
      setEditPropertyData(propertyToEdit);
      setIsEditModalOpen(true);
      setShouldScroll(true);
    }
    setSelectedPropertyId(propertyId);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  const handleSearch = () => {
    fetchProperties();
  };

  const handleAddRoom = async (roomData: AddRoom) => {
    const token = localStorage.getItem('token_auth');
    try {
      if (!selectedPropertyId) {
        throw toast.error('Selected property ID is not set.');
      }
      await axios.post(
        `${baseUrl}/room/create/${selectedPropertyId}`,
        roomData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      handleAddModalClose();
      toast.success('Room added successfully');
      fetchProperties();
    } catch (error) {
      console.error('Error adding room:', error);
      toast.error('Failed to add room');
    }
  };

  const handleEditSuccess = () => {
    fetchProperties();
  };
  useEffect(() => {
    fetchProperties();
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
            value={searchQuery}
            onChange={handleSearchInputChange}
            className=" text-black bg-quaternary h-[40px] outline-none pl-[13px] w-[350px] rounded-l-lg
           placeholder:text-[14px] leading-[20px] font-normal"
            placeholder=" Searc For.."
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
          <div className=" flex items-center gap-[25px] border-r-[1px] pr-[25px]"></div>
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
                      src={'/images/icon-property/name-property.png'}
                      alt="Add image"
                      width={25}
                      className=""
                      height={25}
                    />
                    Name
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider "
                >
                  <div className="flex items-center">
                    <Image
                      src={'/images/icon-property/total.png'}
                      alt="Add image"
                      width={25}
                      height={25}
                    />
                    Jumlah Room
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <Image
                      src={'/images/icon-property/posisi.png'}
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {properties.map((property) => (
                <tr key={property.id}>
                  <Link
                    href={`/admin/property/detail/${property.id}`}
                    className="cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-secondary">
                      {property.name}
                    </td>
                  </Link>
                  <td className="px-6 py-4 whitespace-nowrap text-secondary">
                    {property.Room.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-secondary">
                    {property.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-secondary">
                    {property.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Image
                        src={'/images/icon-property/edit.png'}
                        alt="delete property"
                        width={30}
                        height={30}
                        onClick={() => handleEditClick(property.id)}
                      />
                    </button>
                    <button
                      className="mr-4"
                      onClick={() => deleteProperty(property.id)}
                    >
                      <Image
                        src={'/images/icon-property/delete.png'}
                        alt="delete property"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button
                      className="mr-4 text-black font-bold"
                      onClick={() => handleAddRoomClick(property.id)}
                    >
                      <Image
                        src={'/images/icon-property/add-room.gif'}
                        alt="delete property"
                        width={30}
                        height={30}
                      />
                    </button>
                    <AddImageForProperty propertyId={property.id} />
                    <ReplyReview item={property} />
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

      {isAddRoom && (
        <div ref={editFormRef}>
          <FormAddRoom
            onSubmit={handleAddRoom}
            onCancel={handleAddModalClose}
          />
        </div>
      )}
      {isEditProperty && (
        <div ref={editFormRef}>
          <FormLayoutEdit
            onEditSuccess={handleEditSuccess}
            propertyData={editPropertyData}
            onClose={handleEditModalClose}
            propertyId={selectedPropertyId!}
          />
        </div>
      )}
    </div>
  );
};

export default GetPropertyOwner;
