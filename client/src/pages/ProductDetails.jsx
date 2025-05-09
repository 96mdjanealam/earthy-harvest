import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { FaCartShopping } from "react-icons/fa6";

const ProductDetails = () => {
  const {
    navigate,
    products,
    currency,
    addToCart,
    minusFromCart,
    cartItems,
    setSearchQuery,
  } = useAppContext();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = products.find((item) => item._id === id);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product?.image[0] : null);

    if (products.length > 0) {
      const allRelatedProducts = products.filter(
        (item) => item.category === product.category
      );
      setRelatedProducts(allRelatedProducts.slice(0, 5));
    }
  }, [products, product]);

  return (
    product && (
      <div className="w-full mt-12">
        <p>
          <Link to="/">Home</Link>/ <Link to="/products">Products</Link>/{" "}
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {product.category}
          </Link>
          / <span className="text-primary">{product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border w-20 md:w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 md:w-96 md:h-96 h-64 w-full flex items-center justify-center rounded">
              <img
                src={thumbnail}
                className="w-full h-full object-contain"
                alt="Selected product"
              />
            </div>
          </div>
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-1 text-primary mt-2">
              {Array.from({ length: 5 }, (_, i) =>
                i < 4 ? <FaStar key={i} /> : <FaRegStar key={i} />
              )}
              <p className="text-sm text-gray-600">(4)</p>
            </div>
            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: {currency}
                {product.price}
              </p>
              <p className="text-2xl font-medium">
                MRP: {currency}
                {product.offerPrice}
              </p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base w-full">
              {/* Left Side: Add/Add-Remove Buttons */}
              <div className="text-primary w-1/2 font-bold">
                {!cartItems[product._id] ? (
                  <button
                    className="py-3.5 w-full cursor-pointer flex items-center justify-center gap-1  bg-primary/10 rounded border border-primary box-border"
                    onClick={() => addToCart(product._id)}
                  >
                    <FaCartShopping className="mr-1" />
                    Add
                  </button>
                ) : (
                  <div className="flex w-full items-center justify-center gap-2 py-3.5 bg-primary/25 rounded select-none border border-primary box-border">
                    <button
                      onClick={() => minusFromCart(product._id)}
                      className="cursor-pointer text-md px-2 h-full w-1/3 rounded bg-primary/20 ml-3"
                    >
                      -
                    </button>
                    <span className="w-1/3 text-center">
                      {cartItems[product._id]}
                    </span>
                    <button
                      onClick={() => addToCart(product._id)}
                      className="cursor-pointer w-1/3 text-md px-2 h-full rounded bg-primary/20 mr-3"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
              {/* Right Side: Buy Now Button */}
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                  scrollTo(0, 0);
                }}
                className="py-3.5 w-1/2 rounded cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition border border-primary box-border"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* -------- related products -------- */}
        <div className="mt-20">
          <div className="flex flex-col items-center">
            <p className="text-3xl font-medium">Related Products</p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
            {relatedProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
          <button
            onClick={() => {
              navigate("/products");
              setSearchQuery("");
              scrollTo(0, 0);
            }}
            className="block w-fit mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
          >
            See more
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
