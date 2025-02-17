import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//  Function to fetch cart data
export function getCarts() {
  const token = localStorage.getItem("token"); 
  return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: { token },
  });
}

//  Custom Hook for Fetching Cart Data
export default function useQueryCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCarts, 
  });
}
