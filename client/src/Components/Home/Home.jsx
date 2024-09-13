import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const handleKnowMoreClick = () => {
    navigate('/about');
  };

  return (
    <section className="bg-custom-bg text-white min-h-screen flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 mt-6 bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
          Hi, I’m Ansh Bansal
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed max-w-xl mx-auto">
          I’m a third-year Computer Applications student with a strong passion for Full Stack Development. I specialize in turning creative ideas into dynamic web experiences, balancing both design and performance. Beyond coding, I stay current with web trends and love experimenting with new design concepts. I’m an enthusiastic and quick learner with a strong drive to continuously enhance my skills.
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
