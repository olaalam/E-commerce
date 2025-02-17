import React, { useState, useEffect ,useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import Loading from "./Loading";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../hooks/useMutationCart";
import { toast } from "react-hot-toast";
import { NumItemContext } from "../context/NumCartContext";

export default function ProductDetails() {
  let [productDetails, setProductDetails] = useState({});
  let [loading, setLoading] = useState(true);
  let { id, catId } = useParams();
  let [imgSrc, setImgSrc] = useState("");
  let [ind, setInd] = useState(0);
  let [categoryDetails, setCategoryDetails] = useState([]);

  async function getProductDetails() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  }

  async function getCategoryDetails() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`);
      setCategoryDetails(data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch related products.");
    }
  }

  useEffect(() => {
    getCategoryDetails();
  }, [catId]);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  function handleImageClick(e) {
    setImgSrc(e.target.src);
    setInd(e.target.getAttribute("data-index"));
  }

  // ✅ Fixed `useMutation` Hook (Only One Call)
  const { mutate, isPending } = useMutation({
    mutationFn: () => addToCart(productDetails._id),
    onSuccess: (data) => {
      console.log("Mutation Success:", data);
      toast.success(data?.data?.message || "Added to cart successfully! 🎉");
      setCart((prev) => prev + 1);
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      let errorMessage =
        error?.response?.data?.message || // ✅ Correct Axios Error Handling
        error?.message || 
        "Failed to add to cart. ❌";
      toast.error(errorMessage);
    },
  });

  // ✅ Show loading if data is still being fetched
  if (loading) {
    return <Loading />;
  }
  const { cart, setCart } = useContext(NumItemContext);

  return (
    <div className="m-auto p-[32px] pb-10 dark:bg-gray-900 dark:text-white light:text-gray-900 light:bg-white border-b dark:border-gray-800 shadow-md">
      <div className="flex flex-col md:flex-row"> {/* Change to flex-col for small screens */}
        {/* Main product image */}
        <div className="w-full md:w-2/3 flex flex-col pb-0 mb-0">
          <img src={imgSrc || productDetails?.imageCover} alt={productDetails?.title} className="w-[70%] mx-auto" />
          {/* Thumbnail images */}
          <div className="flex pt-3 overflow-x-auto"> {/* Allow horizontal scrolling for thumbnails */}
            {productDetails?.images?.map((image, index) => (
              <div key={index}>
                <img
                  onClick={handleImageClick}
                  src={image}
                  alt={productDetails?.title}
                  data-index={index}
                  className={`${
                    index === parseInt(ind) ? "border-4 border-main-color opacity-100" : "opacity-50"
                  } w-[50%] h-auto object-cover cursor-pointer`}
                />
              </div>
            ))}
          </div>
        </div>
  
        {/* Product details */}
        <div className="w-full md:w-1/3 flex flex-col py-5 pe-4 pt-8">
          <h1 className="text-3xl font-bold">{productDetails?.title}</h1>
          <p className="text-lg pt-3 opacity-75">{productDetails?.description}</p>
  
          <div className="flex justify-between items-center mt-14">
            <div className="right">
              <h3 className="text-lg">{productDetails?.category?.name}</h3>
              <h3 className="text-xl font-semibold">{productDetails?.price} EGP</h3>
            </div>
            <div className="left">
              <p className="flex items-center">
                {productDetails?.ratingsAverage}
                <i className="fa-solid fa-star text-rating-color pe-1"></i>
              </p>
            </div>
          </div>
  
          {/* Add to Cart button */}
          <button
            onClick={() => mutate()}
            disabled={isPending}
            className={`w-full py-3 my-10 bg-main-color text-white text-center rounded ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
  
      {/* Related Products */}
      <div className="flex flex-col py-5 pt-20">
        <h1 className="text-3xl font-bold">Related Products:</h1>
        <div className="flex flex-wrap gap-4">
          {categoryDetails.length > 0 &&
            categoryDetails.map((product, index) => <ProductItem key={index} item={product} />)}
        </div>
      </div>
    </div>
  );
}
