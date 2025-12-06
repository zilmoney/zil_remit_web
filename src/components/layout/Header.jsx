import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img src="/Bluelogo.svg" alt="ZilRemit" className="h-12 w-auto" />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <a href={isHome ? "#features" : "/#features"} className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                Features
              </a>
              <a href={isHome ? "#solutions" : "/#solutions"} className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                Solutions
              </a>
              <a href={isHome ? "#pricing" : "/#pricing"} className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                Pricing
              </a>
              <Link to="/about" className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                About
              </Link>
              <a href={isHome ? "#support" : "/#support"} className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                Support
              </a>
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a href="https://app.zilremit.com/login" className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Sign In
            </a>
            <a href="https://app.zilremit.com/signup" className="bg-green-600 hover:bg-green-700 hover:shadow-lg text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105">
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <a href={isHome ? "#features" : "/#features"} className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                Features
              </a>
              <a href={isHome ? "#solutions" : "/#solutions"} className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                Solutions
              </a>
              <a href={isHome ? "#pricing" : "/#pricing"} className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                Pricing
              </a>
              <Link to="/about" className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                About
              </Link>
              <a href={isHome ? "#support" : "/#support"} className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                Support
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <a href="https://app.zilremit.com/login" className="block w-full text-left text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                  Sign In
                </a>
                <a href="https://app.zilremit.com/signup" className="mt-2 block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-base font-medium btn-primary text-center">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;

