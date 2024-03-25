"use client";
import { Textarea } from "flowbite-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { RoomStatus, RoomType } from "../../../../../types/room.type";

export interface EditRoom {
  id: any;
  type: RoomType;
  status: RoomStatus;
  price: number;
  description: string;
  bedroom: string;
  bathroom: string;
  spaciousRoom: string;
}

interface EditRoomProps {
  roomData: EditRoom;
  onSubmit: (roomData: EditRoom) => Promise<void>;
  onCancel: () => void;
}

const validationSchema = yup.object({
  type: yup.string().required("Room type is required"),
  status: yup.string().required("Room status is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  description: yup.string().required("Description is required"),
  bedroom: yup.string().required("Bedroom is required"),
  bathroom: yup.string().required("Bathroom is required"),
  spaciousRoom: yup.string().required("Spacious room is required"),
});

const EditRoomForm: React.FC<EditRoomProps> = ({
  roomData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<EditRoom>({
    id: roomData.id,
    type: roomData.type,
    status: roomData.status,
    price: roomData.price,
    description: roomData.description,
    bedroom: roomData.bedroom,
    bathroom: roomData.bathroom,
    spaciousRoom: roomData.spaciousRoom,
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await onSubmit(values);
        formik.resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Error updating room", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    setFormData(roomData);
  }, [roomData]);

  if (!roomData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="min-h-screen pt-2">
        <div className="bg-[#e9ebf2] w-full h-[100%]">
          <div className="flex flex-col lg:flex-row w-10/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: "url('/images/daftar.jpg')" }}
            >
              <h1>Welcome to Room Editing!</h1>
              <p>Lets edit this room!</p>
            </div>
            <div className="w-full lg:w-1/2 py-5 px-12">
              <h2 className="text-3xl mb-4 text-black text-center">
                Edit Room
              </h2>
              <form onSubmit={formik.handleSubmit} className="w-[100%] h-full ">
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <select
                    name="type"
                    onChange={handleChange}
                    value={formData.type}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="" disabled className="text-black">
                      Select your Room Type
                    </option>
                    <option value="LUXURY" className="text-black">
                      LUXURY
                    </option>
                    <option value="DELUXE" className="text-black">
                      DELUXE
                    </option>
                    <option value="SUPERIOR" className="text-black">
                      SUPERIOR
                    </option>
                    <option value="EXECUTIVE" className="text-black">
                      EXECUTIVE
                    </option>
                    <option value="CLUB" className="text-black">
                      CLUB
                    </option>
                    <option value="STANDARD" className="text-black">
                      STANDARD
                    </option>
                  </select>
                  <select
                    name="status"
                    onChange={handleChange}
                    value={formData.status}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="AVAILABLE" className="text-black">
                      AVAILABLE
                    </option>
                    <option value="OCCUPIED" className="text-black">
                      OCCUPIED
                    </option>
                    <option value="RENOVATION" className="text-black">
                      RENOVATION
                    </option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <input
                    type="text"
                    name="bedroom"
                    onBlur={formik.handleBlur}
                    onChange={handleChange}
                    value={formData.bedroom}
                    placeholder="Your Bedrooms"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />

                  <input
                    name="bathroom"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={handleChange}
                    placeholder="Type bathroom Room"
                    value={formData.bathroom}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <input
                    name="spaciousRoom"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={handleChange}
                    value={formData.spaciousRoom}
                    placeholder="Type bathroom Room"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />

                  <input
                    name="price"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    type="number"
                    value={formData.price}
                    placeholder="Type price Room"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mt-5">
                  <Textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    required
                    value={formData.description}
                    placeholder="Description"
                    className="min-h-32 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="bg-red-600 text-white px-4 py-2 rounded w-full text-center"
                    onClick={onCancel}
                  >
                    Close
                  </button>
                  <div className="mt-2">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded w-full text-center"
                    >
                      Update Room
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoomForm;
