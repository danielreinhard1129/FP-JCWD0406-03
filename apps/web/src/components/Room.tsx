"use client";

import useGetAllRooms from "@/hooks/useGetAllRoom";
import RoomCard from "./helper/RoomCard";

const Hootel = () => {
  const { loading, error, rooms } = useGetAllRooms();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" pt-[5rem] bg-gray-200 pb-[4rem]">
      <h1 className=" heading">Best Room for You</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] items-center w-[80%] mx-auto mt-[4rem]">
        {rooms.map((room) => (
          <div key={room.id}>
            <RoomCard room={room} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hootel;
