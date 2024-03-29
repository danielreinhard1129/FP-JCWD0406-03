"use client";

import { useFormik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { IFormUser } from "../../../../../types/form.type";
import { validationSchema } from "./validationSchema";

interface RegisterFormProps {
  onSubmit: (values: IFormUser) => void;
}

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      contact: "",
      alamat: "",
      roleId: 0,
      role: 0,
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form
      className="container flex w-[80%]  md:w-[100%] flex-col gap-4 bg-white rounded-md  p-5"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-center items-center border-b-2">
        <h1 className=" text-black font-bold text-2xl relative">
          Register Here<span className=" text-red-600">!</span>
        </h1>
      </div>
      <div>
        <div className="block">
          <label htmlFor="username" className="block text-black font-semibold">
            Username
          </label>
        </div>
        <input
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="username"
          name="username"
          type="text"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {formik.errors.username && formik.touched.username && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
        )}
      </div>
      <div className="">
        <div className="w-full ">
          <label htmlFor="email" className="block  text-black font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>
        <div className="w-full ">
          <div className="block">
            <label
              htmlFor="contact"
              className="block  text-black font-semibold"
            >
              Contact
            </label>
          </div>
          <PhoneInput
            international
            defaultCountry="ID"
            value={formik.values.contact}
            onChange={(value) => formik.setFieldValue("contact", value)}
            onBlur={formik.handleBlur}
            id="contact"
            name="contact"
            className="shadow appearance-none border bg-white rounded w-full py-2 px-2 text-gray-700"
          />
          {formik.errors.contact && formik.touched.contact && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.contact}</p>
          )}
        </div>
      </div>
      <div className="">
        <div className=" w-full ">
          <div className="block">
            <label
              htmlFor="password"
              className="block  text-black font-semibold"
            >
              Your Password
            </label>
          </div>
          <div className="relative">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="shadow-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>
        {/* // value={formik.values.password} */}
        <div className="w-full">
          <div className=" mt-2 block">
            <label
              htmlFor="confirm password"
              className="mb-1 block  text-black font-semibold"
            >
              Confirm Password
            </label>
          </div>
          <div className="relative">
            <input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              className="shadow-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
      <div>
        <div className="mb-1 block">
          <label htmlFor="alamat" className="  text-black font-semibold">
            Your Alamat
          </label>
        </div>
        <input
          value={formik.values.alamat}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="alamat"
          type="text"
          required
          name="alamat"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        {formik.errors.alamat && formik.touched.alamat && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.alamat}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};
