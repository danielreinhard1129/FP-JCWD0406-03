import Image from "next/image";

import { BiArea, BiBath, BiBed } from "react-icons/bi";
import Link from "next/link";
import { Room } from "../../../../types/room.type";
interface Props {
  room: Room;
}

const RoomCardFilter = ({ room }: Props) => {
  const id = room.propertyId;
  const roomImage =
    room && room.images.length
      ? `http://localhost:8000/room-pictures/${room.images[0].image}`
      : "/images/logo.png";

  return (
    <div className=" bg-quaternary shadow-xl p-5 rounded-lg rounded-tl-[90px] w-full max-w-[340px] mx-auto cursor-pointer hover:shadow-2xl ">
      <Link href={`/properti/${id}`}>
        <div className=" w-[100%] h-[12rem] relative overflow-hidden transition mb-5">
          <Image
            src={`${roomImage}`}
            alt={"in adalah image"}
            layout="fill"
            className="rounded-tl-[66px] rounded-br-[15px] mb-8 object-fill"
          />
        </div>
        <div className=" mb-3 flex gap-x-2 text-sm">
          <div className=" bg-green-500 rounded-full text-white px-3">
            {room.type}
          </div>
          <div className=" bg-violet-500 rounded-full text-white px-3">
            {room.status}
          </div>
        </div>
        <div className=" text-sm font-semibold max-w-[250px] line-clamp-2">
          {room.description}
        </div>
        <div className=" flex gap-x-3 my-2">
          <div className=" flex items-center text-gray-600 gap-1">
            <div className=" text-[20px]">
              <BiBed />
            </div>
            <div>{room.bedroom}</div>
          </div>
          <div className=" flex items-center text-gray-600 gap-1">
            <div className=" text-[20px]">
              <BiBath />
            </div>
            <div>{room.bathroom}</div>
          </div>
          <div className=" flex items-center text-gray-600 gap-1">
            <div className=" text-[20px]">
              <BiArea />
            </div>
            <div>{room.spaciousRoom} sq ft</div>
          </div>
        </div>
        <div>{room.price}</div>
      </Link>
    </div>
  );
};

export default RoomCardFilter;
