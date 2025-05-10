import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Seller Status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("api/seller/is-auth");
      setIsSeller(data.success);
    } catch {
      setIsSeller(false);
    }
  };

  // Fetch User Status
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch {
      setUser(null);
      setCartItems({});
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Sync Cart with Database
  const syncCartWithDB = async (newCartItems) => {
    if (!user) return;
    try {
      const { data } = await axios.post("/api/cart/update", {
        cartItems: newCartItems,
      });
      if (!data.success) {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to sync cart.");
    }
  };

  // Add to Cart
  const addToCart = (itemId) => {
    if (!user) {
      toast.error("Please login to add to cart");
      setShowUserLogin(true)
      return;
    }
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to Cart");
    syncCartWithDB(cartData);
  };

  // Update Cart Item
  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
    syncCartWithDB(cartData);
  };

  // Minus from Cart
  const minusFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Removed from cart");
    syncCartWithDB(cartData);
  };

  // Delete from Cart
  const deleteFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      delete cartData[itemId];
    }
    setCartItems(cartData);
    toast.success("Deleted from cart");
    syncCartWithDB(cartData);
  };

  // Cart Count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, count) => acc + count, 0);
  };

  // Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const itemInfo = products.find((product) => product._id === item);
      if (cartItems[item] > 0 && itemInfo) {
        totalAmount += itemInfo.offerPrice * cartItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // Initial Fetch
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    minusFromCart,
    deleteFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
    fetchUser,
    setCartItems,
    syncCartWithDB,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
