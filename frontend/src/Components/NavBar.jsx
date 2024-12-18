import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, BookOpen } from 'lucide-react'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/Feed", label: "Feed" },
    { to: "/Admin", label: "Admin" }
  ];

  return (
    <nav className="bg-white shadow-md sticky w-full z-50 top-0">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            My Blogo
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`
          fixed md:static 
          top-16 left-0 right-0 
          bg-white md:bg-transparent 
          md:flex md:space-x-6 
          ${isMenuOpen ? 'block' : 'hidden'}
          md:block
          space-y-4 md:space-y-0 
          p-4 md:p-0 
          shadow-md md:shadow-none
        `}>
          {navLinks.map((link) => (
            <li key={link.to} className="text-center md:text-left">
              <Link 
                to={link.to} 
                onClick={toggleMenu}
                className="
                  text-gray-700 
                  hover:text-blue-600 
                  font-medium 
                  block md:inline 
                  py-2 md:py-0 
                  transition-colors
                "
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}