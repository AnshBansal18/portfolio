import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="bg-custom-bg flex flex-col justify-center items-center h-screen p-6 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 md:text-8xl">404</h1>
        <p className="text-lg mb-8 md:text-xl">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-400 hover:underline text-lg md:text-xl transition-colors duration-300">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
