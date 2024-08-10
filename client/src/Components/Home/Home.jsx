import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (portfolioData && portfolioData.intro) {
      setLoading(false);
    }
  }, [portfolioData]);

  if (loading) {
    return (
      <section className="bg-custom-bg text-white min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-t-4 border-b-4 border-gradient-to-r from-red-500 to-yellow-500 rounded-full animate-spin"></div>
      </section>
    );
  }

  const handleKnowMoreClick = () => {
    navigate('/about');
  };

  return (
    <section className="bg-custom-bg text-white min-h-screen flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 mt-6 bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
          Hi, I’m {portfolioData.intro.fullName}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed max-w-xl mx-auto">
          {portfolioData.intro.caption} {portfolioData.intro.description}
        </p>
        <button
          onClick={handleKnowMoreClick}
          className="flex items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 px-6 rounded-full font-semibold text-lg hover:from-yellow-500 hover:to-red-500 transition-transform duration-300 transform hover:scale-105"
        >
          Discover More
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default Home;
