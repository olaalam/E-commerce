import React from "react";
import Loading from "./Loading";
import ProductItem from "./ProductItem";
import useProducts from "../hooks/useProducts"; 
import { Helmet } from "react-helmet";

export default function Products() {
  const { data, isLoading, error, isError } = useProducts(); 

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2 className="text-white bg-red-500 text-center p-9 rounded">{error.message}</h2>;
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white text-gray-900 bg-white border-b dark:border-gray-800 pt-8">
      <div className="row my-10 flex container flex-wrap gap-4 justify-center">
        <Helmet>
          <title>Products</title>
          </Helmet> 
        {data?.map((item) => (
          <ProductItem key={item?._id} item={item} />
        ))}
      </div>
    </div>
  );
}
