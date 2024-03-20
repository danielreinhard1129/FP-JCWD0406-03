import React from "react";
import { Room } from "../../../../../types/room.type";
import useGetAllRooms from "@/hooks/useGetAllRoom";
import useGetRoomByPropertyId from "@/hooks/useGetRoomByIdProperty";

interface Props {
  propertyId: number;
}

const RoomListTable = ({ propertyId }: Props) => {
  const { loading, error, rooms } = useGetRoomByPropertyId(propertyId);

  if (!rooms) {
    return <div>Loading...</div>;
  }
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">No.</th>
          <th className="px-4 py-2">Room Type</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{room.type}</td>
            <td className="border px-4 py-2">{room.price}</td>
            <td className="border px-4 py-2">{room.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomListTable;
