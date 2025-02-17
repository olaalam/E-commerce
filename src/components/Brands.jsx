import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";

const fetchBrands = async () => {
  const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  return data;
};

export default function Brands() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const [hoveredBrand, setHoveredBrand] = useState(null);

  return (
    <div className="dark:bg-gray-900 dark:text-white light:text-gray-900 light:bg-white border-b dark:border-gray-800 shadow-md p-6">
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-6">Our Brands</h2>

      {isLoading && <Loading />}
      {isError && <p className="text-red-500 text-center">Error: {error.message}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container gap-6">
        {data?.data?.map((brand) => (
          <div
            key={brand._id}
            onMouseEnter={() => setHoveredBrand(brand._id)}
            onMouseLeave={() => setHoveredBrand(null)}
            className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-center transition-all duration-300 ${
              hoveredBrand === brand._id ? "border-2 border-main-color rounded-2xl" : "border border-transparent"
            }`}
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-40 object-contain rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
