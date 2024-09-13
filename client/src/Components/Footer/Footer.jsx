import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    const footerData = {
        logo: 'https://res.cloudinary.com/dl2qgtamc/image/upload/v1723125399/Screenshot_2024-08-08_192614_s2i0w9.png',
        name: 'Ansh Bansal',
        copyrightText: '© 2024 Ansh Bansal. All rights reserved.',
        socialMediaLinks: {
            github: 'https://github.com/AnshBansal18',
            linkedin: 'http://www.linkedin.com/in/ansh-bansal04',
            instagram: 'https://www.instagram.com/anshbansal.18',
            twitter: 'https://x.com/anshban96221431',
        },
    };

    return (
        <footer className="bg-custom-bg text-white p-4 border-t border-white border-opacity-50 flex flex-col items-center md:flex-row md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                {footerData.logo && <img src={footerData.logo} alt="Logo" className="w-12 h-12 rounded-full border border-white border-opacity-60" />}
                <p className="text-lg font-semibold">{footerData.name}</p>
            </div>
            <p className="text-sm text-center flex-grow mb-4 md:mb-0">{footerData.copyrightText}</p>
            <div className="flex space-x-6 text-lg">
                {footerData.socialMediaLinks.github && (
                    <a
                        href={footerData.socialMediaLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="hover:text-gray-400 transition-colors"
                    >
                        <FaGithub />
                    </a>
                )}
                {footerData.socialMediaLinks.linkedin && (
                    <a
                        href={footerData.socialMediaLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-gray-400 transition-colors"
                    >
                        <FaLinkedin />
                    </a>
                )}
                {footerData.socialMediaLinks.instagram && (
                    <a
                        href={footerData.socialMediaLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="hover:text-gray-400 transition-colors"
                    >
                        <FaInstagram />
                    </a>
                )}
                {footerData.socialMediaLinks.twitter && (
                    <a
                        href={footerData.socialMediaLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X"
                        className="hover:text-gray-400 transition-colors"
                    >
                        <FaXTwitter />
                    </a>
                )}
            </div>
        </footer>
    );
};

export default Footer;
