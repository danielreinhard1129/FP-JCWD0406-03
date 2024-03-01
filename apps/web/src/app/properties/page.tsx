import React from "react";

const Property = () => {
  return (
    <div>
      <div className=" pt-[5rem] bg-gray-200 pb-[4rem]">
        <h1 className=" heading">Best Room Property</h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] items-center w-[80%] mx-auto mt-[4rem]">
          {/* {rooms.map((room) => (
            <div key={room.id}>
              <RoomCard room={room} />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Property;
