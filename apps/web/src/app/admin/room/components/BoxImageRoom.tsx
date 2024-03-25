import React from "react";
import Image from "next/image";

interface RoomImage {
  image: string;
}

interface RoomImageBox {
  images: RoomImage[];
}

const RoomImageBox: React.FC<RoomImageBox> = ({ images }) => {
  return (
    <div className="bg-white rounded shadow-lg p-4 w-[100%] min-h-min">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-center text-gray-600">
          Property Images
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-40 border border-gray-300 rounded overflow-hidden"
            >
              <Image
                src={`http://localhost:8000/property-pictures/${image.image}`}
                alt={`Property Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomImageBox;
