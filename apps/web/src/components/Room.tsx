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
    <div className=" bg-gray-50  py-10">
      <section data-aos="fade-up" className="container  max-w-full ">
        <h1 className="my-8 border-l-8 border-blue-900 py-2 pl-2 text-[36px] font-bold ">
          Best Room for You
        </h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[2rem] items-center w-[80%] mx-auto mt-[4rem">
          {rooms.map((room) => (
            <div key={room.id}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hootel;
