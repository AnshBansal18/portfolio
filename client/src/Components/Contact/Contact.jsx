import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Static contact data
  const contactData = {
    email: 'anshbansal2004@gmail.com',
    phone: '9015530660',
    socialMediaLinks: {
      github: 'https://github.com/AnshBansal18',
      linkedin: 'http://www.linkedin.com/in/ansh-bansal04',
      twitter: 'https://x.com/anshban96221431',
      instagram: 'https://www.instagram.com/anshbansal.18',
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFormError(errorData.error || 'Failed to send message. Please try again later.');
        return;
      }

      setFormSuccess('Message sent successfully!');
      setFormState({
        name: '',
        email: '',
        message: '',
      });
    } catch {
      setFormError('Failed to send message. Please try again later.');
    }
  };

  const socialMedia = contactData.socialMediaLinks;

  return (
    <section className="bg-custom-bg text-white min-h-screen py-12 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 mt-4 text-center bg-gradient-to-r from-yellow-500 via-red-500 to-green-500 text-transparent bg-clip-text">
          Let&apos;s Connect
        </h1>

        <div className="flex flex-col md:flex-row md:justify-between mb-8">
          <div className="flex-1 mb-6 md:mb-0">
            <p className="text-lg mb-4 flex items-center">
              <FaEnvelope className="text-blue-400 text-2xl mr-4" />
              <a href={`mailto:${contactData.email}`} className="hover:underline">
                {contactData.email}
              </a>
            </p>
            <p className="text-lg flex items-center">
              <FaPhoneAlt className="text-green-400 text-2xl mr-4" />
              {contactData.phone}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            {socialMedia.github && (
              <a href={socialMedia.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-3xl hover:text-white transition-colors duration-300">
                <FaGithub />
              </a>
            )}
            {socialMedia.linkedin && (
              <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-3xl hover:text-white transition-colors duration-300">
                <FaLinkedin />
              </a>
            )}
            {socialMedia.instagram && (
              <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-3xl hover:text-white transition-colors duration-300">
                <FaInstagram />
              </a>
            )}
            {socialMedia.twitter && (
              <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-3xl hover:text-white transition-colors duration-300">
                <FaXTwitter />
              </a>
            )}
          </div>
        </div>

        <div className="mb-4 flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.049158479751!2d77.20263559323038!3d28.644375810527997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd6a1d2921af%3A0x570c5acc7d0f7853!2sPaharganj%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1723172881170!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full max-w-4xl mx-auto mb-8 rounded-lg shadow-lg"
          ></iframe>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 bg-custom-bg p-8 rounded-lg shadow-lg">
          {formError && <div className="text-red-500">{formError}</div>}
          {formSuccess && <div className="text-green-500">{formSuccess}</div>}
          <h2 className="text-2xl md:text-4xl font-bold text-center bg-gradient-to-r from-yellow-500 via-red-500 to-green-500 text-transparent bg-clip-text my-4 md:my-8">
            Reach Out via the Form
          </h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-medium rounded-lg hover:bg-gradient-to-l transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
