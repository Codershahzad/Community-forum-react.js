import React from "react";

const Navbar = ({ setView }) => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => setView("forum")}>
        Community
      </h1>
      <div className="flex gap-4">
        <button
          className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
          onClick={() => setView("signup")}
        >
          Signup / Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
