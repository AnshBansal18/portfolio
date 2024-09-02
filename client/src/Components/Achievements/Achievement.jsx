import React from 'react';
import { FaTrophy, FaChess, FaStar } from 'react-icons/fa';

const achievements = [
  {
    id: 1,
    title: 'Hackathons',
    description: 'Participated in 5 hackathons, finishing in the top 5 twice.',
    icon: <FaTrophy size={40} className="text-yellow-500" />,
    image: 'https://pics.craiyon.com/2023-10-13/062229a4b4764ea2a7ade9781b1a11b4.webp'
  },
  {
    id: 2,
    title: 'Chess Championship',
    description: 'Represented The Union Academy Senior Secondary School at the district level chess championship and won a bronze medal.',
    icon: <FaChess size={40} className="text-blue-500" />,
    image: 'https://pics.craiyon.com/2023-10-07/c0d73dd439bc41b882c074ae63cb4433.webp'
  },
  {
    id: 3,
    title: 'Karate Belt',
    description: 'Achieved junior yellow belt in inter-school karate competitions.',
    icon: <FaStar size={40} className="text-red-500" />,
    image: 'https://pics.craiyon.com/2023-10-04/58742620d9244dd59678ad3d5517d233.webp'
  }
];

const Achievements = () => {
  return (
    <main className="bg-custom-bg text-white min-h-screen py-16 px-6 sm:px-10 lg:px-20">
      <section className="container mx-auto">
        <br/>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 text-transparent bg-clip-text text-center">
          My Achievements
          <br/>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <article
              key={achievement.id}
              className="bg-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                {achievement.icon}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold ml-4 text-gray-300">{achievement.title}</h2>
              </div>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed mb-4 text-gray-200">{achievement.description}</p>
              {achievement.image && (
                <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-lg">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Achievements;
