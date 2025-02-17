import axios from "axios";
import { useMutation } from "@tanstack/react-query";
const token = localStorage.getItem("token");
// Add to cart function
export async function addToCart(productId) {

  if (!token) {
    throw new Error("No token found. Please log in.");
  }
  const response = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    { productId },
    { headers: { token } }
  );
  return response.data;
}

// Delete item from cart function
export const deleteItem = (productId) => {

  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    headers: { token },
  }).catch((err) => {
    console.error("Delete item error:", err.response ? err.response.data : err);
    throw err; // Rethrow after logging
  });
};


// Clear cart function
export function clearCart() {
  return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: { token: localStorage.getItem("token") },
  });
}

// Update items in cart function
export const updateItem = (productId,count) => {

  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count },
    { headers: { token } }
  );
};
// Payment function
export function paymentItems({ cartId, url, shippingAddress }) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    { shippingAddress },
    { headers: { token } }
  );
}





// Custom Hook for Mutations (optional)
export default function useMutationCart(fn) {
  return useMutation(fn, {
    onError: (error) => {
      console.error("Mutation failed:", error.message);
    },
    onSuccess: (data) => {
      console.log("Mutation succeeded:", data);
    },
  });
}
