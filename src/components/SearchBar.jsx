import React from "react";

const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search questions..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
    />
  );
};

export default SearchBar;
