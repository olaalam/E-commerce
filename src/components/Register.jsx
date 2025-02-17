import React, { useContext, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserToken } from "../context/UserToken";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errMseg, setErrMesg] = useState("");
  const navigate = useNavigate();
  let { setLogin } = useContext(UserToken);
  async function handleRegister(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setLogin(data.token);
        navigate("/cart");
      }
      setErrMesg("");
    } catch (error) {
      setErrMesg("email already exists");
    } finally {
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "tooShort")
      .max(5, "tooLong")
      .required("this field is required"),
    email: Yup.string()
      .email("invalid email")
      .required("this field is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{2,5}$/, "Invalid password format")
      .required("required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("required"),
    phone: Yup.string()
      .required("This field is required")
      .matches(/^(01)[0|1|2|5|9][0-9]{8}$/, "Invalid phone number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <div className="dark:bg-gray-900 p-5 sm:p-10 lg:p-20 dark:text-white border-b dark:border-gray-800 shadow-md">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-center text-3xl font-semibold py-4">Register Now</h1>
  
        <div className="relative mb-6">
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
            className="peer block w-full px-4 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:border-green-500 dark:text-white dark:border-gray-600 dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder=" "
          />
          {!formik.values.name && (
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 dark:text-gray-400 left-4 top-3 transition-all"
            >
              First Name
            </label>
          )}
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>
  
        <div className="relative mb-6">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="peer block w-full px-4 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:border-green-500 dark:text-white dark:border-gray-600 dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder=" "
          />
          {!formik.values.email && (
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 left-4 top-3 transition-all"
            >
              Email Address
            </label>
          )}
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>
  
        <div className="relative mb-6">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="peer block w-full px-4 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:border-green-500 dark:text-white dark:border-gray-600 dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder=" "
          />
          {!formik.values.password && (
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 left-4 top-3 transition-all"
            >
              Password
            </label>
          )}
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          )}
        </div>
  
        <div className="relative mb-6">
          <input
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="rePassword"
            className="peer block w-full px-4 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:border-green-500 dark:text-white dark:border-gray-600 dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder=" "
          />
          {!formik.values.rePassword && (
            <label
              htmlFor="rePassword"
              className="absolute text-sm text-gray-500 dark:text-gray-400 left-4 top-3 transition-all"
            >
              Confirm Password
            </label>
          )}
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.rePassword}</p>
          )}
        </div>
  
        <div className="relative mb-6">
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="peer block w-full px-4 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:border-green-500 dark:text-white dark:border-gray-600 dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder=" "
          />
          {!formik.values.phone && (
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 dark:text-gray-400 left-4 top-3 transition-all"
            >
              Phone Number
            </label>
          )}
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
          )}
        </div>
  
        <button
          type="submit"
          className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition duration-200 ease-in-out dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );

  
}
