"use client";

import { Textarea } from "flowbite-react";
import { useFormik } from "formik";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import * as yup from "yup";
export interface AddRoom {
  type: RoomType;
  status: RoomStatus;
  price: number;
  description: string;
  bedroom: string;
  bathroom: string;
  spaciousRoom: string;
}

export enum RoomType {
  LUXURY = "LUXURY",
  DELUXE = "DELUXE",
  SUPERIOR = "SUPERIOR",
  EXECUTIVE = "EXECUTIVE",
  CLUB = "CLUB",
  STANDARD = "STANDARD",
}
export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  UNDER_RENOVATION = "UNDER_RENOVATION",
}

interface FormAddRoom {
  onSubmit: (roomData: AddRoom) => Promise<void>;
  onCancel: () => void;
}

const validationSchema = yup.object({
  type: yup.string().required("Type Room is required"),
  status: yup.string().required("Status is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().required("Description is required"),
  bedroom: yup.number().required("bedroom is required"),
  bathroom: yup.string().required("bathroom is required"),
  spaciousRoom: yup.string().required("Spacious Room is required"),
});
const FormAddRoomProperty: React.FC<FormAddRoom> = ({ onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      type: RoomType.LUXURY,
      status: RoomStatus.AVAILABLE,
      price: 0,
      description: "",
      bedroom: "",
      bathroom: "",
      spaciousRoom: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        onSubmit(values);

        formik.resetForm();
        alert("Room Added successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error adding room", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
    },
  });
  return (
    <div>
      <div className=" min-h-screen pt-2">
        <div className="  bg-[#e9ebf2] w-full h-[100%]">
          <div className=" flex flex-col  lg:flex-row w-10/12 bg-white rounded-xl mx-auto  shadow-lg overflow-hidden">
            <div
              className=" w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center "
              style={{ backgroundImage: "url('/images/daftar.jpg')" }}
            >
              <h1>Welcome to Event Creation!</h1>
              <p>Lets create an amazing Room!</p>
            </div>

            <div className=" w-full lg:w-1/2 py-5 px-12 ">
              <h2 className=" text-3xl mb-4 text-black text-center">
                {" "}
                Add Room
              </h2>
              <form onSubmit={formik.handleSubmit} className=" w-[100%] h-full">
                <div className=" grid grid-cols-2 gap-5 mb-5">
                  <select
                    name="type"
                    onChange={formik.handleChange}
                    value={formik.values.type}
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
                    onChange={formik.handleChange}
                    value={formik.values.status}
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
                <div className=" grid grid-cols-2 gap-5 mb-5">
                  <input
                    type="text"
                    name="bedroom"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Your Bedrooms"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formik.errors.bedroom && formik.touched.bedroom && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.bedroom}
                    </p>
                  )}
                  <input
                    name="bathroom"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Type bathroom Room"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formik.errors.bathroom && formik.touched.bathroom && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.bathroom}
                    </p>
                  )}
                </div>
                <div className=" grid grid-cols-2 gap-5 mb-5">
                  <input
                    name="spaciousRoom"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Type bathroom Room"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formik.errors.spaciousRoom &&
                    formik.touched.spaciousRoom && (
                      <p className="text-red-500 text-sm mt-0">
                        {formik.errors.spaciousRoom}
                      </p>
                    )}
                  <input
                    name="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="number"
                    placeholder="Type price Room"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />

                  {formik.errors.price && formik.touched.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.price}
                    </p>
                  )}
                </div>
                <div className=" mt-5">
                  <Textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    placeholder="Description"
                    className="min-h-32 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formik.errors.description && formik.touched.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.description}
                    </p>
                  )}
                </div>
                <div className=" mt-4">
                  <button
                    type="button"
                    className="bg-red-600 text-white px-4 py-2 rounded w-full text-center"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                  <div className=" mt-2">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded w-full text-center"
                    >
                      Add Room
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

export default FormAddRoomProperty;
