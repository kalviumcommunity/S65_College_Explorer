import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-white text-xl font-bold">College Explorer</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md font-medium">Home</Link>
            <Link to="/about" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md font-medium">About</Link>
            <Link to="/contact" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md font-medium">Contact</Link>
            
            {currentUser ? (
              <button 
                onClick={handleLogout}
                className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium"
              >
                Logout
              </button>
            ) : (
              <Link to="/admin" className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
                Admin Panel
              </Link>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-600">
            <Link to="/" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-blue-700">Home</Link>
            <Link to="/about" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-blue-700">About</Link>
            <Link to="/contact" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-blue-700">Contact</Link>
            
            {currentUser ? (
              <button 
                onClick={handleLogout}
                className="w-full text-left text-white block px-3 py-2 rounded-md font-medium hover:bg-blue-700"
              >
                Logout
              </button>
            ) : (
              <Link to="/admin" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-blue-700">Admin Panel</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;