"use client";

import { useQueryState } from "nuqs";

const StockSearchBar = () => {
  const [searchTerm, setSearchTerm] = useQueryState("search", {
    throttleMs: 750,
    defaultValue: "",
    clearOnDefault: true,
  });

  return (
    <input
      className="placeholder:text-gray-300 placeholder:font-medium px-3 py-2 pb-4 rounded-md focus:border-none focuse:ring-none"
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search for a stock..."
    />
  );
};

export default StockSearchBar;
