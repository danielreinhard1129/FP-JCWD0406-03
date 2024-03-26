"use client";
import React from "react";
import { useFormik } from "formik";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import * as yup from "yup";

export interface AddPeakSeosenRate {
  startDate: string;
  endDate: string;
  PriceAdjustmentPercentage: number;
}

const validationSchema = yup.object({
  startDate: yup.string().required("Type Room is required"),
  endDate: yup.string().required("Status is required"),
  PriceAdjustmentPercentage: yup.number().required("Price is required"),
});
interface FormAddPeaksSeosenRate {
  onSubmit: (peakSeosenrateData: AddPeakSeosenRate) => Promise<void>;
  onCancel: () => void;
}

const FormPeakSeosenRate: React.FC<FormAddPeaksSeosenRate> = ({
  onSubmit,
  onCancel,
}) => {
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      PriceAdjustmentPercentage: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        onSubmit(values);

        formik.resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Error adding Peak Seosen Rate", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
    },
  });
  return (
    <>
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
                Create Room Promo
              </h2>
              <form onSubmit={formik.handleSubmit} className=" w-[100%] h-full">
                <div className="grid grid-cols-1 gap-5 mb-5">
                  <div className="">
                    <label className="mb-1 block text-base font-medium text-black dark:text-white">
                      Start Date<span className="text-[#DC3545]">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Your star tDate"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.errors.startDate && formik.touched.startDate && (
                      <p className="text-red-500 text-sm mt-[5px]">
                        {formik.errors.startDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className=" grid grid-cols-1 gap-5 mb-5">
                  <div>
                    <label className=" block text-base font-medium text-black dark:text-white">
                      End Date<span className="text-[#DC3545]">*</span>
                    </label>
                    <input
                      name="endDate"
                      type="date"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Your endDate"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.errors.endDate && formik.touched.endDate && (
                      <p className="text-red-500 text-sm mt-[5px]">
                        {formik.errors.endDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 mb-5">
                  <div className="">
                    <label className="mb-1 block text-base font-medium text-black dark:text-white">
                      Price Adjustment Percentage
                      <span className="text-[#DC3545]">*</span>
                    </label>
                    <input
                      name="PriceAdjustmentPercentage"
                      type="number"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Price Adjustment Percentage"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.errors.PriceAdjustmentPercentage &&
                      formik.touched.PriceAdjustmentPercentage && (
                        <p className="text-red-500 text-sm mt-[5px]">
                          {formik.errors.PriceAdjustmentPercentage}
                        </p>
                      )}
                  </div>
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
    </>
  );
};

export default FormPeakSeosenRate;
