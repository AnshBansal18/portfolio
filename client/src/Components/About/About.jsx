import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ImageComponent from './ImageComponent';

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

  if (isLoading) return <p className="text-center bg-custom-bg text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;
  if (!data) return <p className="text-center bg-custom-bg text-white">No data found</p>;

  const { about } = data;
  const { description, imageUrl, whatIKnow } = about;

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
          <ImageComponent src={imageUrl} />
        </figure>
      </section>
      <section className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 bg-gradient-to-r from-yellow-500 via-orange-600 to-red-600 text-transparent bg-clip-text">
          I am Familiar With
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {whatIKnow && whatIKnow.length > 0 ? (
            whatIKnow.map((category) => (
              <article
                key={category._id}
                className="bg-transparent p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {category.skills.map((skill) => (
                    <span
                      key={skill._id}
                      className="bg-gray-500 px-4 py-2 rounded-full text-sm text-white hover:bg-gray-800 transition-colors duration-300"
                    >
                      {skill.skillName}
                    </span>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <p className="text-center text-gray-400">No skills available</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default About;
