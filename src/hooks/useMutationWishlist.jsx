import React from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
const token = localStorage.getItem("token");


// Function to delete an item from the wishlist
export const deleteWish = (productId) => {

  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      headers: { token },
    })
    .catch((err) => {
      console.error("Delete item error:", err.response?.data || err);
      throw err;
    });
};

// Function to add/update an item in the wishlist
export const updateWish = (productId) => {
  return axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    { productId },
    { headers: { token } }
  );
};


export default function  useMutationWishlist(fn) {
  return useMutation(fn, {
    onError: (error) => {
      console.error("Mutation failed:", error.message);
    },
    onSuccess: (data) => {
      console.log("Mutation succeeded:", data);
    },
  });
};
