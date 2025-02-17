import React, { useContext, useState,useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCarts } from "../hooks/useQueryCart";
import { clearCart, deleteItem, updateItem } from "../hooks/useMutationCart";
import { updateWish } from "../hooks/useMutationWishlist";
import Loading from "../components/Loading";
import image from "../assets/empty.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { NumItemContext } from "../context/NumCartContext";
import { useQueryClient } from "@tanstack/react-query";

export default function Cart() {
  const queryClient = useQueryClient();
  const [pendingDelete, setPendingDelete] = useState(null);

  // Query to fetch cart data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: getCarts,
  });

  // Context to set cart items count
  const { setCart } = useContext(NumItemContext);

  // State to track wishlist status for each product
  const [wishlistStatus, setWishlistStatus] = useState({});

  // Update cart item count in context
  useEffect(() => {
    if (data?.data?.numOfCartItems != null) {
      setCart(data.data.numOfCartItems);
    }
  }, [data, setCart]);

  // Mutations for cart operations
  const { mutate: clearMutate, isLoading: isClear } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const { mutate: deleteMutate , isLoading: isDeleting} = useMutation({
    mutationFn: deleteItem,
    onMutate: (productId) => setPendingDelete(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      setPendingDelete(null);
    },
    onError: () => setPendingDelete(null),
  });

  const { mutate: updateMutate, isLoading: updateIsLoading } = useMutation({
    mutationFn: ({ productId, count }) => updateItem(productId, count),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const { mutate: addWish, isLoading: isAddingToWishlist } = useMutation({
    mutationFn: updateWish,
    onSuccess: () => queryClient.invalidateQueries(["wishlist"]),
  });

  // Handle loading and error states
  if (isLoading || updateIsLoading || isDeleting || isClear) return <Loading />;
  if (isError) return <p className="text-red-500">Error: {error?.message}</p>;

  // Handle empty cart scenario
  if (!data?.data?.numOfCartItems) {
    return (
      <div className="text-center">
        <img className="mx-auto my-8" src={image} alt="empty cart" />
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  const cartItems = data?.data?.data?.products || [];
  const cartId = data?.data?.cartId;

  // Initialize wishlist status based on cart items
  if (wishlistStatus && Object.keys(wishlistStatus).length === 0) {
    const initialStatus = cartItems.reduce((acc, prod) => {
      acc[prod.product._id] = false; 
      return acc;
    }, {});
    setWishlistStatus(initialStatus);
  }
  

  const toggleWishlist = (productId) => {
    setWishlistStatus((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
    addWish(productId);
  };

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 dark:bg-gray-900 dark:text-white m-auto text-gray-900 bg-white border-b dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-4">
          Your Cart:{" "}
          <span className="text-gray-600">
            {data?.data?.numOfCartItems} Items
          </span>
        </h2>
        <h2 className="text-2xl font-bold mb-4">
          Total Price:{" "}
          <span className="text-gray-600">
            {data?.data?.data?.totalCartPrice} EGP
          </span>
        </h2>

        <div className="hidden md:block">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-16 py-3">Image</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Qty</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((prod) => (
                <tr
                  key={prod.product._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="p-2">
                    <img
                      src={prod.product.imageCover}
                      className="w-12 md:w-24 max-w-full max-h-full md:ms-10"
                      alt={prod.product.title}
                    />
                  </td>
                  <td className="px-3 py-2 font-semibold text-gray-900 dark:text-white">
                    {prod.product.title}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateMutate({
                            productId: prod.product._id,
                            count: Math.max(prod.count - 1, 1),
                          })
                        }
                        className="p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-10 border ps-3 text-center text-gray-900 text-xs rounded-lg p-1 mx-1"
                        value={prod.count}
                        readOnly
                      />
                      <button
                        onClick={() =>
                          updateMutate({
                            productId: prod.product._id,
                            count: prod.count + 1,
                          })
                        }
                        className="p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                    {prod.price} EGP
                  </td>
                  <td className="px-3 pt-16 flex items-center space-x-2">
                    <button
                      onClick={() => deleteMutate(prod.product._id)}
                      className="bg-red-500 text-white rounded p-1 hover:bg-red-600 disabled:opacity-50"
                      disabled={pendingDelete === prod.product._id}
                    >
                      {pendingDelete === prod.product._id ? (
                        "Deleting..."
                      ) : (
                        <i className="fa fa-trash"></i>
                      )}
                    </button>

                    <button
                      onClick={() => toggleWishlist(prod.product._id)}
                      className={`text-white rounded p-1 transition-all duration-200 ${
                        wishlistStatus[prod.product._id]
                          ? "bg-red-500"
                          : "bg-main-color"
                      }`}
                    >
                      <i
                        className={`fa fa-heart ${
                          wishlistStatus[prod.product._id]
                            ? "text-white"
                            : "text-gray-100"
                        }`}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive for Small Screens */}
        <div className="block md:hidden space-y-4">
          {cartItems.map((prod) => (
            <div
              key={prod.product._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border dark:border-gray-700 flex flex-col items-center text-center"
            >
              <img
                src={prod.product.imageCover}
                className="w-24 mb-2"
                alt={prod.product.title}
              />
              <p className="font-semibold text-gray-900 dark:text-white">
                {prod.product.title}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {prod.price} EGP
              </p>
              <div className="flex items-center justify-center my-2">
                <button
                  onClick={() =>
                    updateMutate({
                      productId: prod.product._id,
                      count: Math.max(prod.count - 1, 1),
                    })
                  }
                  className="p-2 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 font-semibold text-gray-900 dark:text-white">
                  {prod.count}
                </span>
                <button
                  onClick={() =>
                    updateMutate({
                      productId: prod.product._id,
                      count: prod.count + 1,
                    })
                  }
                  className="p-2 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="px-3 pt-16 flex items-center space-x-2">
                <button
                  onClick={() => deleteMutate(prod.product._id)}
                  className="bg-red-500 text-white rounded p-1 hover:bg-red-600 disabled:opacity-50"
                  disabled={isDeleting}
                >
                  {isDeleting ? "..." : <i className="fa fa-trash"></i>}
                </button>
                <button
                  onClick={() => toggleWishlist(prod.product._id)}
                  className={`rounded p-1 transition-all duration-200 ${
                    wishlistStatus[prod.product._id]
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  <i className={`fa fa-heart text-white`}></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 gap-4 w-full">
          <button
            onClick={() => clearMutate()}
            className="bg-main-color text-white rounded p-2 flex-1 max-w-md hover:bg-green-800 transition-all duration-75 disabled:opacity-50"
            disabled={isClear}
          >
            {isClear ? "Clearing Cart..." : "Clear Cart"}
          </button>
          <Link to="/payment" state={{ cartId }} className="flex-1 max-w-md">
            <button className="bg-main-color text-white rounded p-2 w-full hover:bg-green-800 transition-all duration-75">
              Proceed to Payment
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
