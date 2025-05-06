import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { FaCartShopping } from "react-icons/fa6";
import { FaStar, FaRegStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const {
    currency,
    addToCart,
    minusFromCart,
    cartItems = {},
    navigate,
  } = useAppContext();

  if (!product) return null;

  return (
    <div className="border border-gray-500/20 rounded-md px-3 py-3 bg-white w-full">
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          scrollTo(0, 0);
        }}
        className="group cursor-pointer flex items-center justify-center px-2"
      >
        <img
          className="group-hover:scale-105 transition h-36 object-contain"
          src={product.image?.[0] || assets.placeholder_image}
          alt={product.name}
        />
      </div>
      <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product.name}
        </p>
        <div className="flex items-center gap-1 text-primary">
          {Array.from({ length: 5 }, (_, i) =>
            i < 4 ? <FaStar key={i} /> : <FaRegStar key={i}/>
          )}
          <p className="text-sm text-gray-600">(4)</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-primary">
            {currency}
            {product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              {currency}
              {product.price}
            </span>
          </p>
          <div className="text-primary">
            {!cartItems[product._id] ? (
              <button
                className="flex items-center justify-center gap-1 cursor-pointer bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded"
                onClick={() => addToCart(product._id)}
              >
                <FaCartShopping />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                <button
                  onClick={() => minusFromCart(product._id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">
                  {cartItems[product._id]}
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
