"use client";

import React, { useState } from "react";
import { Room } from "../../../../../types/room.type";
import useGetAllRooms from "@/hooks/useGetAllRoom";
import useGetRoomByPropertyId from "@/hooks/useGetRoomByIdProperty";
import Image from "next/image";
import { MdAddShoppingCart, MdSave, MdShoppingCart } from "react-icons/md";
import LoadingProperty from "./LoadingProperty";

interface Props {
  propertyId: number;
  addToCart: (roomType: string, price: number) => void;
}

const RoomListTable = ({ propertyId, addToCart }: Props) => {
  const { loading, error, rooms } = useGetRoomByPropertyId(propertyId);
  const [shoppingCart, setShoppingCart] = useState<string[]>([]);

  const handleAddToCart = (roomType: string, price: number) => {
    addToCart(roomType, price);
    setShoppingCart([...shoppingCart, roomType]);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Room Type</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{room.type}</td>
              <td className="border px-4 py-2">{room.price}</td>
              <td className="border px-4 py-2">{room.description}</td>
              <td className="border px-4 py-2">
                {room.status === "AVAILABLE" && (
                  <div className="hidden sm:flex justify-center">
                    <style jsx>{`
                      @media screen and (min-width: 768px) {
                        .icon-image {
                          display: none;
                        }
                        .icon-image img {
                          display: none;
                        }
                        .icon-image svg {
                          display: inline-block;
                        }
                      }

                      @media screen and (max-width: 767px) {
                        .icon-image {
                          display: inline-block;
                        }
                        .icon-image img {
                          display: inline-block;
                        }
                        .icon-image svg {
                          display: none;
                        }
                      }
                    `}</style>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mx-1">
                      <Image
                        src={"/images/icon-property/cart.png"}
                        alt="Add to Cart"
                        width={24}
                        height={24}
                        onClick={() => handleAddToCart(room.type, room.price)}
                      />
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded mx-1">
                      <Image
                        src={"/images/icon-property/buy.png"}
                        alt="Buy"
                        width={24}
                        height={24}
                      />
                    </button>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded mx-1">
                      <Image
                        src={"/images/icon-property/save.png"}
                        alt="Save"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                )}
                <div className="sm:hidden flex justify-center">
                  <CartIcon />
                  <BuyIcon />
                  <SaveIcon />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CartIcon: React.FC = () => <MdShoppingCart size={24} />;
const BuyIcon: React.FC = () => <MdAddShoppingCart size={24} />;
const SaveIcon: React.FC = () => <MdSave size={24} />;

export default RoomListTable;
