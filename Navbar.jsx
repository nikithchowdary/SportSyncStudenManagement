import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Trophy } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
              <Trophy className="h-8 w-8 text-blue-500" />
              <span className="font-extrabold text-xl tracking-tight uppercase">SportSync</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-blue-400 transition-colors py-2 text-sm font-medium">Home</Link>
            <Link to="/events" className="hover:text-blue-400 transition-colors py-2 text-sm font-medium">Events</Link>
            <Link to="/results" className="hover:text-blue-400 transition-colors py-2 text-sm font-medium">Standings</Link>
            
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-2 pt-2 pb-4 space-y-1">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/events"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium"
          >
            Events
          </Link>
          <Link
            to="/results"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium"
          >
            Standings
          </Link>

          <div className="border-t border-slate-800 my-2 pt-2">
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'}
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors mb-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/50 px-4 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium transition-colors mb-2"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
