import React, { useState } from "react";
import { useQueryWishlist } from "../hooks/useQueryWishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWish } from "../hooks/useMutationWishlist";
import Loading from "./Loading";
import { Helmet } from "react-helmet";
import { FaTrash } from "react-icons/fa";
import emptyWishlistImage from "../assets/empty_wishlist.png"; 
import axios from "axios";

export default function Wishlist() {
  const queryClient = useQueryClient();
  const { data, error, isError, isLoading } = useQueryWishlist();
  const [pendingRemove, setPendingRemove] = useState(null);
  const [pendingAdd, setPendingAdd] = useState(null);

  const removeItem = useMutation({
    mutationFn: deleteWish,
    onMutate: (productId) => setPendingRemove(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
      setPendingRemove(null);
    },
    onError: (error) => {
      console.error("Error removing wishlist item:", error.message);
      setPendingRemove(null);
    },
  });

  const addItemToCart = async (productId) => {
    const token = localStorage.getItem("token");
    await axios.post("https://ecommerce.routemisr.com/api/v1/cart", 
      { productId }, 
      { headers: { token } }
    );
  };

  const addItem = useMutation({
    mutationFn: addItemToCart,
    onMutate: (productId) => setPendingAdd(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]); 
      setPendingAdd(null);
    },
    onError: (error) => {
      console.error("Error adding to cart:", error.message);
      setPendingAdd(null);
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );

  const wishlistItems = data?.data || [];

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center dark:bg-gray-900">
          <img
            src={emptyWishlistImage}
            alt="Empty Wishlist"
            className="w-64 h-auto mb-6 bg-white"
          />
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
            Your wishlist is empty!
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Add some items to your wishlist.
          </p>
        </div>
      ) : (
        <div className="relative container overflow-x-auto sm:rounded-lg p-6 dark:bg-gray-900 dark:text-white m-auto text-gray-900 border-b dark:border-gray-800">
          <h2 className="text-3xl text-center mb-6">
            <i className="fa-regular text-gray-500 fa-heart text-[70px]"></i>
            <span className="block font-bold text-gray-600 dark:text-gray-300 text-[50px]">
              My Wishlist
            </span>
          </h2>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-16 py-3">Image</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Unit Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems?.map((prod) =>
                  prod._id ? (
                    <tr
                      key={prod._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="p-2 relative flex items-center space-x-2">
                        <button
                          onClick={() => removeItem.mutate(prod._id)}
                          className="bg-gray-500 text-white rounded hover:bg-gray-600 p-3 disabled:opacity-50"
                          disabled={pendingRemove === prod._id}
                        >
                          {pendingRemove === prod._id ? "Removing..." : <FaTrash size={18} />}
                        </button>
                        <img
                          src={prod.imageCover}
                          className="w-12 md:w-24 max-w-full max-h-full"
                          alt={prod.title}
                        />
                      </td>
                      <td className="px-3 py-2 font-semibold text-gray-900 dark:text-white">
                        {prod.title}
                      </td>
                      <td className="px-3 py-2 font-semibold text-gray-900 dark:text-white">
                        {prod.price} EGP
                      </td>
                      <td className="px-3 py-2">
                        <button
                          onClick={() => addItem.mutate(prod._id)}
                          className="bg-main-color text-white rounded p-2 transition-all duration-200 disabled:opacity-50"
                          disabled={pendingAdd === prod._id}
                        >
                          {pendingAdd === prod._id ? "Adding..." : "Add to Cart"}
                        </button>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Responsive for Small Screens */}
          <div className="block md:hidden space-y-4">
            {wishlistItems.map((prod) => (
              <div
                key={prod._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border dark:border-gray-700 flex flex-col items-center text-center"
              >
                <img
                  src={prod.imageCover}
                  className="w-24 mb-2"
                  alt={prod.title}
                />
                <p className="font-semibold text-gray-900 dark:text-white">
                  {prod.title}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {prod.price} EGP
                </p>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => removeItem.mutate(prod._id)}
                    className="bg-gray-500 p-3 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                    disabled={pendingRemove === prod._id}
                  >
                    {pendingRemove === prod._id ? "Removing..." : <FaTrash size={18} />}
                  </button>
                  <button
                    onClick={() => addItem.mutate(prod._id)}
                    className="bg-main-color text-white rounded p-2 transition-all duration-200 disabled:opacity-50"
                    disabled={pendingAdd === prod._id}
                  >
                    {pendingAdd === prod._id ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}