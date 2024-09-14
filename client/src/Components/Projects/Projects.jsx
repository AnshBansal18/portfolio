import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProjects = async () => {
  const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/get-portfolio-data`);
  return response.data.projects || [];
};

const Projects = () => {
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 60000, 
    cacheTime: 300000, 
  });

  if (isLoading) {
    return (
      <section className="bg-custom-bg py-16 px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">Projects</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="bg-gray-800 animate-pulse text-white rounded-lg shadow-lg overflow-hidden"
            >
              <figure className="relative">
                <div className="w-full h-48 sm:h-60 bg-gray-700"></div>
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-xl font-semibold text-white bg-gray-700 rounded w-3/4 h-6"></h2>
                </figcaption>
              </figure>
              <div className="p-4">
                <p className="text-white mb-4 bg-gray-700 rounded w-full h-24"></p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <span key={idx} className="text-sm font-medium text-white bg-gray-700 px-2 py-1 rounded"></span>
                  ))}
                </div>
                <a
                  href="#"
                  className="block bg-gray-600 text-center py-2 px-4 rounded-lg text-white font-semibold"
                >
                  <span className="bg-gray-700 rounded w-24 h-6 inline-block"></span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-custom-bg py-16 px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">Projects</h1>
        </header>
        <div className="text-center text-white">
          <p>Error loading projects: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-custom-bg py-16 px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white">Projects</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((project) => (
            <article
              key={project._id}
              className="bg-black text-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <figure className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 sm:h-60 object-cover"
                  loading="lazy"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                </figcaption>
              </figure>
              <div className="p-4">
                <p className="text-white mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-white font-semibold">TechStack:</span>
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="text-sm font-medium text-white bg-black px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-600 text-center py-2 px-4 rounded-lg text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Project
                </a>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-white">No projects available.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
