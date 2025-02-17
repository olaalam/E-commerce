import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProducts() {
  const getProducts = async () => {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return response.data.data; 
  };

  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
