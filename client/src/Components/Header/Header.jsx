import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiMail, FiLayers } from 'react-icons/fi';
import { RiMenu4Fill } from 'react-icons/ri';

const iconMap = {
  FiHome,
  FiUser,
  FiMail,
  FiLayers,
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navData = {
    logo: 'https://res.cloudinary.com/dl2qgtamc/image/upload/v1723125399/Screenshot_2024-08-08_192614_s2i0w9.png',
    name: 'Ansh Bansal',
    navItems: [
      { name: 'Home', path: '/', icon: 'FiHome' },
      { name: 'About', path: '/about', icon: 'FiUser' },
      { name: 'Contacts', path: '/contacts', icon: 'FiMail' },
      { name: 'Projects', path: '/projects', icon: 'FiLayers' },
    ],
  };

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
          <RiMenu4Fill />
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
