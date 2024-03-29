"use client";

import useGetRoomByPropertyId from "@/hooks/useGetRoomByIdProperty";
import { useAppSelector } from "@/lib/hooks";
import { Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  propertyId: number;
}

const RoomListTable = ({ propertyId }: Props) => {
  const { rooms } = useGetRoomByPropertyId(propertyId);
  const router = useRouter();
  const { id } = useAppSelector((state) => state.user);

  const handleBookRoom = (roomId: number) => {
    if (id !== 0) {
      router.push(`/booking/${roomId}`);
    } else {
      toast.info("User not logged in.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Bedroom</Table.HeadCell>
          <Table.HeadCell>Bathroom</Table.HeadCell>
          <Table.HeadCell>Spacious Room</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {rooms.map((room, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {room.type}
              </Table.Cell>
              <Table.Cell>{room.price}</Table.Cell>
              <Table.Cell>{room.bedroom}</Table.Cell>
              <Table.Cell>{room.bathroom}</Table.Cell>
              <Table.Cell>{room.spaciousRoom}</Table.Cell>
              <Table.Cell>
                <button
                  onClick={() => handleBookRoom(room.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Booking
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default RoomListTable;
