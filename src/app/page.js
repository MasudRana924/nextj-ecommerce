"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products"; // Import the products
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const pageSize = 6; // Number of products per page

  // Calculate total pages (based on filtered products)
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // Products to display (filtered + paginated)
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  // Filter products based on search query
  const filterProducts = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Handle search query change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle page change
  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mt-24 mb-8 w-3/4 mx-auto">
      {/* Search Bar */}
      <div className="w-full flex justify-center mb-8 ">
        <div className="relative max-w-lg w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="w-full h-12 py-2 px-4 pr-12 text-sm text-gray-700 bg-gray-100 rounded-lg outline-none  transition-all duration-300"
          />
          {/* Search Button */}
          <Button
            variant="outline"
            onClick={filterProducts}
            className="absolute top-0 right-0 h-full px-4 bg-indigo-500 text-white"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Display Search Results Count */}
      {searchQuery && (
        <p className="text-sm text-gray-600 mb-4">
          {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"} found for "{searchQuery}".
        </p>
      )}

      {/* Products */}
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            No products found for "{searchQuery}".
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => goToPage(page)}
            className={page === currentPage ? "bg-indigo-500 text-white" : ""}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
