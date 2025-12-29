import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { FaHome, FaPlusCircle, FaUserCircle, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function Navbar({ user }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800 tracking-tight">
              Comm<span className="text-blue-600">Unity</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              <FaHome className="text-lg" />
              <span className="hidden md:inline">Home</span>
            </Link>

            {user ? (
              <>
                <Link to="/ask" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <FaPlusCircle className="text-lg" />
                  <span className="hidden md:inline">Ask</span>
                </Link>
                
                <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <FaUserCircle className="text-lg" />
                  <span className="hidden md:inline">Profile</span>
                </Link>

                <button 
                  onClick={() => auth.signOut()}
                  className="flex items-center space-x-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-red-100"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Login
                </Link>
                
                <Link to="/signup" className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all">
                  <FaUserPlus />
                  <span>Signup</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}