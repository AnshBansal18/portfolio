import React from 'react';

const ImageComponent = ({ src }) => (
  <img
    src={src}
    alt="Profile"
    className="w-52 h-52 md:w-72 md:h-72 object-cover rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-500"
  />
);

export default ImageComponent;
