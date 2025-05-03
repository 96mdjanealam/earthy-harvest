import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

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
    <div className="mt-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
      </div>
      {myOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg mb-12 p-6 md:p-8"
        >
          <div className="flex justify-between md:items-start text-gray-500 md:font-medium max-md:flex-col">
            <p className="md:w-1/2">Order ID: {order._id}</p>
            <div className="flex flex-col md:flex-row md:w-1/2 md:justify-between md:items-start">
              <p>Payment: {order.paymentType}</p>
              <p>
                Total Amount: {currency}
                {order.amount}
              </p>
            </div>
          </div>
          {order.items.map((item, index) => (
            <div
              key={index}
              className={`text-gray-600 ${
                order.items.length !== index + 1 && "border-b pb-5"
              } border-gray-200 pt-5`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center md:w-1/2 gap-4 mb-4 md:mb-0">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <img
                      src={item.product.image[0]}
                      className="w-16 h-16 object-contain"
                      alt=""
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.product.name}
                    </h2>
                    <p className="text-sm">{item.product.category}</p>
                  </div>
                </div>
                <div className="md:w-1/2 flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-700">
                  <div>
                    <p>Quantity: {item.quantity || "1"}</p>
                    <p>Status: {order.status}</p>
                    <p>
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-primary text-base font-semibold mt-2 md:mt-0">
                    Amount: {currency}
                    {item.product.offerPrice * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
