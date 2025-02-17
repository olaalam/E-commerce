import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

// Function to fetch the wishlist
const fetchWishlist = async () => {
  const token = localStorage.getItem("token"); 
  const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: { token },
  });
  return data;
};

// Custom Hook to use the wishlist query
export function useQueryWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
  });
}
