import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Loading from "./Loading";
import image from "../assets/no-order.jpg";

const fetchOrders = async (userId) => {
  if (!userId) {
    throw new Error("No userId found in localStorage");
  }
  
  const response = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
  );
  return response.data;
};

const Orders= () => {
  const userId = localStorage.getItem("userId");
  console.log("Retrieved User ID:", userId);

  const { data: orders = [], error, isLoading } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => fetchOrders(userId),
    enabled: !!userId, 
  });

  if (isLoading) return <Loading/>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white text-h2">
        My Orders
      </h2>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-5 rounded-lg shadow-lg bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Order ID: {order.id}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                🕒 Order Date: {moment(order.createdAt).format("YYYY-MM-DD HH:mm")}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                💰 Total Price: <span className="font-semibold">{order.totalOrderPrice} EGP</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                📦 Payment Status: {order.isPaid ? "✅ Paid" : "❌ Not Paid"}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                🚚 Delivery Status: {order.isDelivered ? "📦 Delivered" : "⏳ Not Delivered"}
              </p>

              <div className="mt-4">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="flex items-center border-t pt-3 mt-3">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md mr-3"
                    />
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        {item.product.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.price} EGP<span className="font-semibold ps-5">({item.count})</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all"
                onClick={() => console.log("Reorder", order._id)}
              >
                Reorder
              </button>
            </div>
          ))}
        </div>
      ) : (
       <img className="flex justify-center items-center w-[50%] h-[50%] object-cover m-auto " src={image} alt="You have no orders yet" />
      )}
    </div>
  );
};

export default Orders;
