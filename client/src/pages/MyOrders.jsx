import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="text-2xl font-medium uppercase text-gray-800">
          My orders
        </p>
        <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
      </div>

      {myOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg mb-12 p-6 md:p-8 bg-white shadow-sm"
          >
            <div className="flex flex-col md:flex-row justify-between text-gray-500 font-medium">
              <p>Order ID: {order._id}</p>
              <div className="mt-2 md:mt-0 flex flex-col md:flex-row gap-4">
                <p>Payment: {order.paymentType}</p>
                <p>
                  Total: {currency}
                  {order.amount}
                </p>
              </div>
            </div>

            {order.items.map((item, i) => (
              <div
                key={i}
                className={`text-gray-600 pt-5 ${
                  order.items.length !== i + 1 &&
                  "border-b pb-5 border-gray-200"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 md:w-1/2">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <img
                        src={item.product?.image[0]}
                        className="w-16 h-16 object-contain"
                        alt={item.product?.name}
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.product?.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {item.product?.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 md:w-1/2 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <p>Quantity: {item.quantity || "1"}</p>
                      <p>Status: {order.status}</p>
                      <p>
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-primary text-base font-semibold mt-2 md:mt-0">
                      Amount: {currency}
                      {item.product?.offerPrice * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
