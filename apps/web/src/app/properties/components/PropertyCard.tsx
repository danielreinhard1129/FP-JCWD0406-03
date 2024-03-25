import { StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { FcLike } from "react-icons/fc";
import { MdAddShoppingCart } from "react-icons/md";
import { Property } from "../../../../types/properties.type";
interface Props {
  property: Property;
}

const PropertyCard = ({ property }: Props) => {
  const propertyImage =
    property && property.images.length
      ? `
  http://localhost:8000/property-pictures/${property.images[0].image}`
      : "/images/logo.png";
  return (
    <div className=" max-w-full">
      <div className="w-full  flex-wrap flex justify-center items-center ">
        <div className=" w-[260px] p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
          {property.images && property.images.length > 0 ? (
            <Image
              src={`http://localhost:8000/property-pictures/${property.images[0].image}`}
              alt="destination"
              width={200}
              height={300}
              className=" h-40  w-full object-cover rounded-xl"
            />
          ) : (
            <Image
              src={"/images/logo.jfif"}
              alt="placeholder"
              width={200}
              height={100}
              className=" h-40 w-full object-cover rounded-xl"
            />
          )}
          <div className="">
            <h2 className="font-bold text-lg ">{property.type}</h2>
            <span className="text-lg font-semibold"> {property.location}</span>
          </div>

          <div className=" flex items-center mt-2 gap-1">
            <StarIcon className=" text-orange-600 w-[1rem] h-[1rem]" />
            <StarIcon className=" text-orange-600 w-[1rem] h-[1rem]" />
            <StarIcon className=" text-orange-600 w-[1rem] h-[1rem]" />
            <StarIcon className=" text-orange-600 w-[1rem] h-[1rem]" />
            <StarIcon className=" text-orange-600 w-[1rem] h-[1rem]" />
            <p className=" font-bold text-xs text-gray-700"> Best Ratings</p>
          </div>
          <p className=" text-sm text-gray-600 mt-2 mb-2">
            {property.description.length > 50
              ? `${property.description.substring(0, 50)}...`
              : property.description}
          </p>
          <div className=" flex items-center justify-center gap-2 mb-3">
            <button className=" px-3 py-1 rounded-lg bg-[#3237c0] hover:bg-primary">
              <Image
                src={"/images/icon-property/buy.png"}
                alt="love"
                width={30}
                height={30}
              />
            </button>
            <button className=" px-3 py-1 rounded-lg bg-[#9c33c4] hover:bg-secondary">
              <Image
                src={"/images/keranjang.png"}
                alt="love"
                width={30}
                height={30}
              />
            </button>
            <button className=" px-3 py-1 rounded-lg bg-red-500 hover:bg-secondary">
              <Image
                src={"/images/love.png"}
                alt="love"
                width={30}
                height={30}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
