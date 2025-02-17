import React from "react";
import Loading from "./Loading";
import useProducts from "../hooks/useProducts";
import Productitem from "./productItem";

export default function FeaturedProducts() {
  const { data: products, isLoading, error, isError } = useProducts();

  return (
    <div className="container dark:bg-gray-900 dark:text-white light:text-gray-900 light:bg-white border-b dark:border-gray-800 shadow-md p-4">

      {isLoading && <Loading />}


      {isError && <p className="text-red-500">Error: {error?.message || "Failed to fetch products."}</p>}

      {/* Display Products */}
      <div className="flex flex-wrap gap-4">
        {!isLoading && !isError && Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Productitem item={product} key={product._id || nanoid()} /> 
          ))
        ) : (
          !isLoading &&
          !isError && <p className="text-gray-500">No products available at the moment.</p>
        )}
      </div>
    </div>
  );
}
