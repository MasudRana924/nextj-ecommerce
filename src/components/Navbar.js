"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation in Next.js 13+
import { useSelector } from "react-redux";
import {
  FaShoppingCart,
  FaUserCircle,
  FaHome,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";

const Navbar = () => {
  const { token } = useSelector((state) => state.login);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/products?search=${searchQuery}`); // Navigate to products page with the search query
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300"
          >
            <span className="mr-2 text-indigo-600">🛍️</span>
            NextJS Shop
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {/* Cart Link */}
            <Link
              href="/cart"
              className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors duration-300 group relative"
            >
              <FaShoppingCart className="mr-1 text-gray-500 group-hover:text-indigo-500 transition-colors" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Conditional Rendering for Login/Avatar */}
            {token ? (
              <Link
                href="/profile" // Redirects to the profile page
                className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors duration-300"
              >
                <FaUserCircle className="text-2xl text-gray-500 hover:text-indigo-500 transition-colors" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors duration-300 group"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
