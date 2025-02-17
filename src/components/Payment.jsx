// Payment.jsx
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { paymentItems } from "../hooks/useMutationCart";
import { useLocation } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  console.log(location);
  
  const cartId = location.state?.cartId;
  
  if (!cartId) {
    return <p className="text-red-500">Error: No Cart ID Found.</p>;
  }
  
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: paymentItems,
    onSuccess: (data) => {
      if (data?.data?.session?.url) {
        window.location.href = data.data.session.url;
      }
    },
    onError: (error) =>
      console.error("Error processing payment:", error.message),
  });

  const handlePayment = (values) => {
    const url = window.location.origin;
    console.log(url); 
    const shippingAddress = {
      details: values.details,
      city: values.city,
      phone: values.phone,
    };
    mutate({ cartId, url, shippingAddress });
  };
  


  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handlePayment,
  });

  return (
    <div className="flex flex-col items-center justify-center h-auto py-10 dark:bg-gray-900 dark:text-white m-auto text-gray-900  border-b dark:border-gray-800">
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Payment</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Details</label>
            <input
              type="text"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-main-color text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-all duration-150 disabled:opacity-50"
          >
            {isLoading ? "Processing Payment..." : "Pay Now"}
          </button>
        </form>

        {isError && (
          <p className="text-red-500 text-center mt-4">
            Error: {error?.response?.data?.message || error.message}
          </p>
        )}
      </motion.div>
    </div>
  );
}
