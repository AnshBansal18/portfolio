import React from 'react';

const SkillsSection = ({ whatIKnow }) => {
  return (
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
  );
};

export default SkillsSection;
