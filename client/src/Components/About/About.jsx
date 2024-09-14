import React, { Suspense, lazy } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SkillsSection from './SkillsSection';

const ImageComponent = lazy(() => import('./ImageComponent'));

const fetchPortfolioData = async () => {
  const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/get-portfolio-data`);
  return response.data;
};

const About = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['portfolioData'],
    queryFn: fetchPortfolioData,
    staleTime: 60000,
    cacheTime: 300000,
  });

  if (isLoading) {
    return (
      <main className="bg-custom-bg text-white min-h-screen py-16 px-6 sm:px-10 lg:px-20">
        <section className="container mx-auto flex flex-col-reverse md:flex-row items-center mb-2">
          <article className="md:w-2/3 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 text-transparent bg-clip-text">
              Who I Am
            </h1>
            <p className="text-lg md:text-xl leading-relaxed bg-gradient-to-r from-white via-gray-100 to-blue-200 text-transparent bg-clip-text shadow-lg rounded-md p-6">
              Loading data...
            </p>
          </article>
          <figure className="md:w-1/3 flex justify-center mb-10 md:mb-0">
            <div className="w-48 h-48 bg-gray-300 rounded-full"></div>
          </figure>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-custom-bg text-white min-h-screen py-16 px-6 sm:px-10 lg:px-20">
        <section className="container mx-auto flex flex-col-reverse md:flex-row items-center mb-2">
          <article className="md:w-2/3 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 text-transparent bg-clip-text">
              Who I Am
            </h1>
            <p className="text-lg md:text-xl leading-relaxed bg-gradient-to-r from-white via-gray-100 to-blue-200 text-transparent bg-clip-text shadow-lg rounded-md p-6">
              Error: {error.message}
            </p>
          </article>
          <figure className="md:w-1/3 flex justify-center mb-10 md:mb-0">
            <div className="w-48 h-48 bg-gray-300 rounded-full"></div> 
          </figure>
        </section>
      </main>
    );
  }

  const { whatIKnow } = data.about;

  const description = "Hello, I’m Ansh Bansal, a dedicated third-year undergraduate in Computer Applications, born and raised in Delhi. I specialize in both Front-End and Back-End technologies, fueled by a strong curiosity and a commitment to continuous learning. My focus is on staying at the forefront of web development by exploring cutting-edge frameworks and refining a diverse set of technical skills. If you share a passion for technology or are interested in connecting professionally, I’d love to hear from you!";
  const imageUrl = "https://res.cloudinary.com/dl2qgtamc/image/upload/v1723020035/WhatsApp_Image_2024-08-07_at_2.10.05_PM_oh0tko.jpg";

  return (
    <main className="bg-custom-bg text-white min-h-screen py-16 px-6 sm:px-10 lg:px-20">
      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center mb-2">
        <article className="md:w-2/3 mb-10 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 text-transparent bg-clip-text">
            Who I Am
          </h1>
          <p className="text-lg md:text-xl leading-relaxed bg-gradient-to-r from-white via-gray-100 to-blue-200 text-transparent bg-clip-text shadow-lg rounded-md p-6">
            {description}
          </p>
        </article>
        <figure className="md:w-1/3 flex justify-center mb-10 md:mb-0">
          <Suspense fallback={<div className="w-48 h-48 bg-gray-300 rounded-full"></div>}>
            <ImageComponent src={imageUrl} />
          </Suspense>
        </figure>
      </section>
      <SkillsSection whatIKnow={whatIKnow} />
    </main>
  );
};

export default About;
