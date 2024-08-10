import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiMail, FiLayers} from 'react-icons/fi';
import { RiMenu4Fill } from "react-icons/ri";
import axios from 'axios';

const iconMap = {
  FiHome,
  FiUser,
  FiMail,
  FiLayers,
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navData, setNavData] = useState({ logo: '', name: '', navItems: [] });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/get-portfolio-data`)
      .then((response) => {
        if (response.data.nav) {
          setNavData(response.data.nav);
        }
      })
      .catch((error) => {
        console.error('Error fetching navigation data:', error);
      });
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-transparent backdrop-blur-sm text-white py-3 fixed w-full top-0 z-50 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        {navData.logo && <img src={navData.logo} alt="Logo" className="h-10 w-10 rounded-full border-2 border-gray-800" />}
        <span className="text-xl font-extrabold">{navData.name}</span>
      </div>

      <nav className="hidden md:flex flex-grow justify-end space-x-8">
        {navData.navItems.map((item, index) => {
          const Icon = iconMap[item.icon];
          return (
            Icon && (
              <Link key={index} to={item.path} className="flex items-center text-lg hover:text-purple-300 transition-colors">
                <Icon className="mr-2 text-xl" />
                {item.name}
              </Link>

            )
          );
        })}
      </nav>

      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle menu" className="text-2xl bg-transparent">
          <RiMenu4Fill  />
        </button>
      </div>

      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-black/60 text-white flex flex-col items-center py-4 md:hidden backdrop-blur-2xl">
          {navData.navItems.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              Icon && (
                <Link
                  key={index}
                  to={item.path}
                  onClick={closeMenu}
                  className="flex items-center text-lg py-2 hover:text-purple-300 transition-colors"
                >
                  <Icon className="mr-2 text-xl" />
                  {item.name}
                </Link>
              )
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Header;
