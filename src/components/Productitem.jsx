import { useMutation } from "@tanstack/react-query";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../hooks/useMutationCart";
import { toast } from "react-hot-toast";
import { NumItemContext } from "../context/NumCartContext";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { updateWish } from "../hooks/useMutationWishlist"; 

export default function Productitem({ item = {} }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { cart, setCart } = useContext(NumItemContext);

  if (!item || Object.keys(item).length === 0) {
    return <p className="text-red-500">Invalid product data</p>;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: () => addToCart(item._id),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Added to cart successfully! 🎉");
      setCart((prev) => prev + 1);
    },
    onError: (error) => {
      let errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add to cart. ❌";

      toast.error(errorMessage);
    },
  });

  console.log("Token from localStorage:", localStorage.getItem("token"));

  // ✅ Wishlist Mutation
  const { wishlist, setWishlist } = useContext(NumItemContext); 

  const { mutate: addWishlist, isPending: isAddingToWishlist } = useMutation({
    mutationFn: () => updateWish(item._id),
    onSuccess: () => {
      toast.success("Added to Wishlist! ❤️");
      setWishlist((prev) => prev + 1); 
    },
    onError: () => {
      toast.error("Failed to add to Wishlist ❌");
    },
  });
  

  return (
    <div
      className={`dark:bg-gray-900 dark:text-white m-auto text-gray-900 border-b dark:border-gray-800 shadow-md cursor-pointer w-full lg:w-1/5 md:w-1/4 sm:w-1/3 p-2 transition-all duration-300 ${
        isHovered
          ? "border-2 border-b-0 rounded-2xl border-main-color"
          : "border border-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div
        onClick={() =>
          navigate(`/productdetails/${item._id}/${item.category?._id}`)
        }
        className="bg-transparent p-4 rounded block"
      >
        {item.imageCover ? (
          <img
            src={item.imageCover}
            alt={item.title}
            className="w-full h-[150px] object-cover rounded"
          />
        ) : (
          <p className="text-gray-500">No Image Available</p>
        )}

        <p className="text-main-color font-semibold">
          {item.category?.name || "Uncategorized"}
        </p>
        <p>{item.title.split("").slice(0, 12).join("") || "No Title"}</p>

        <div className="flex justify-between items-center mt-2">
          <div>
            {item.priceAfterDiscount ? (
              <>
                <p className="text-red-500 line-through">
                  {item.price ? `${item.price} EGP` : "Price Unavailable"}
                </p>
                <p>{item.priceAfterDiscount} EGP</p>
              </>
            ) : (
              <p className="text-black">
                {item.price ? `${item.price} EGP` : "Price Unavailable"}
              </p>
            )}
          </div>

          <div>
            <span className="text-gray-500 pe-3">
              {item.ratingsQuantity ?? 0}
              <i className="fa-solid fa-star text-rating-color"></i>
            </span>
          </div>
        </div>
      </div>

      {isHovered && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              mutate();
            }}
            disabled={isPending}
            className={`bg-main-color text-white transition-all duration-500 p-2 rounded-full ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <FaShoppingCart size={20} />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addWishlist();
            }}
            disabled={isAddingToWishlist}
            className="bg-red-500 text-white transition-all duration-500 p-2 rounded-full hover:bg-red-600"
          >
            {isAddingToWishlist ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <FaHeart size={20} />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
