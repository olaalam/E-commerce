import React, { useContext, useRef, useState, useEffect } from "react";
import { Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/freshcart-logo.svg";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { UserToken } from "../context/UserToken";
import { NumItemContext } from "../context/NumCartContext";
import { useQueryWishlist } from "../hooks/useQueryWishlist"; 
import { getCarts } from "../hooks/useQueryCart"; 

export default function CustomNavbar() {
  let navigate = useNavigate();
  const { login, setLogin } = useContext(UserToken);
  const { cart, wishlist, setCart, setWishlist } = useContext(NumItemContext);
  const [darkMode, setDarkMode] = useState(false);
  const ref = useRef(null);
  const [isScroll, setIsScroll] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
    setLogin(null);
  }

  useEffect(() => {
    const storedMode = localStorage.getItem("dark-mode");
    setDarkMode(storedMode === "true");
    if (storedMode === "true") {
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  function toggleMe() {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("dark-mode", newMode);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch wishlist data
  const { data: wishlistData } = useQueryWishlist({
    onSuccess: (data) => {
      setWishlist(data?.data?.length || 0);
    },
  });

  useEffect(() => {
    if (wishlistData) {
      setWishlist(wishlistData?.data?.length || 0);
    }
  }, [wishlistData, setWishlist]);

  // Fetch cart data
  const { data: cartData } = getCarts({
    onSuccess: (data) => {
      setCart(data?.data?.length || 0);
    },
  });

  useEffect(() => {
    if (cartData) {
      setCart(cartData?.data?.length || 0);
    }
  }, [cartData, setCart]);
  return (
    <>
      <nav
        className={`bg-light-color transition-all duration-500 border-gray-200 dark:bg-gray-900 dark:text-white light:text-gray-900 light:bg-white border-b dark:border-gray-800 shadow-md ${
          isScroll ? "py-1" : "py-3"
        }`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center ps-11 sm:w-[70%] md:w-[20%]">
            <img src={Logo} className="h-8" alt="Flowbite Logo" />
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div className={`lg:justify-between lg:flex w-[80%] ${isMobileMenuOpen ? "block" : "hidden"}`} id="navbar-default">
            <ul className="font-medium text-gray-500 flex flex-col p-4 lg:p-0 mt-4 lg:flex-row lg:space-x-4 rtl:space-x-reverse lg:mt-0 lg:border-0">
              {/* Navigation Links */}
              <li>
                <Link to="/" className="block py-3 focus:text-main-color transition-all duration-[0.5s] hover:text-black" aria-current="page">Home</Link>
              </li>
              <li>
                <Link to="/product" className="block py-3 focus:text-main-color transition-all duration-[0.5s] hover:text-black">Products</Link>
              </li>
              <li>
                <Link to="/category" className="block py-3 focus:text-main-color transition-all duration-[0.5s] hover:text-black">Categories</Link>
              </li>
              <li>
                <Link to="/brand" className="block py-3 focus:text-main-color transition-all duration-[0.5s] hover:text-black">Brands</Link>
              </li>
              {login && (
                <>
                  <li>
                    <Link to="/cart" className="block py-3 focus:text-main-color transition-all duration-[0.5s] hover:text-black">
                      <i className="fa fa-shopping-cart pe-2"></i> {cart ?? 0}
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist" className="block py-3 focus:text-main-color transition-all duration-[0.5s] hover:text-black">
                      <i className="fa-solid fa-heart pe-2"></i> {wishlist ?? 0}
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <ul className="font-medium flex flex-col sm:space-y-3 md:space-y-0  md:items-center p-4 lg:p-0 mt-4 me-24 lg:flex-row lg:space-x-4 rtl:space-x-reverse lg:mt-0 lg:border-0">
              {login ? (
                <li>
                  <Link onClick={logOut} className="py-3 focus:text-main-color transition-all duration-[0.5s] hover:text-black text-gray-500">SignOut</Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="py-3 focus:text-main-color transition-all duration-[0.5s] hover:text-black text-gray-500">Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="py-3 focus:text-main-color transition-all duration-[0.5s] hover:text-black text-gray-500">Register</Link>
                  </li>
                </>
              )}
              <li>
                <label className="inline-flex items-center lg:pt-3 me-5 cursor-pointer">
                  <input
                    onClick={toggleMe}
                    ref={ref}
                    type="checkbox"
                    className="sr-only peer"
                    checked={darkMode}
                    readOnly
                  />
                  <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
