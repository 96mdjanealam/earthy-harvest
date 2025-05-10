import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate, setIsSeller } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        setIsSeller(false);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col h-dvh">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 shrink-0">
        <NavLink to="/" className="flex items-center gap-4">
          <img className="h-10" src={assets.earthy_harvest_logo} alt="logo" />
          <p className="font-bold text-2xl md:text-3xl text-[#89AC46]">
            Earthy <span className="text-primary">Harvest</span>
          </p>
        </NavLink>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="rounded-full bg-gray-200 text-sm px-4 py-1 cursor-pointer hover:bg-red-100 hover:text-red-400 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r text-base border-gray-300 pt-4 flex flex-col overflow-y-auto">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                    : "hover:bg-gray-100/90 border-white"
                }`}
            >
              <img src={item.icon} alt="icon" className="w-7 h-7" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
        {/* Main Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;
