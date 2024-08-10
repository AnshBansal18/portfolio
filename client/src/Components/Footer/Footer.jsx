import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/get-portfolio-data`)
            .then(response => setFooterData(response.data.footer))
            .catch(error => console.error('Error fetching footer data:', error));
    }, []);

    if (!footerData) {
        return <footer className="bg-custom-bg text-white p-4 text-center border-t border-white">Loading...</footer>;
    }

    const { logo, name, copyrightText, socialMediaLinks } = footerData;

    return (
        <footer className="bg-custom-bg text-white p-4 border-t border-white border-opacity-50 flex flex-col items-center md:flex-row md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                {logo && <img src={logo} alt="Logo" className="w-12 h-12 rounded-full border border-white border-opacity-60" />}
                <p className="text-lg font-semibold">{name}</p>
            </div>
            <p className="text-sm text-center flex-grow mb-4 md:mb-0">{copyrightText}</p>
            <div className="flex space-x-6 text-lg">
                {socialMediaLinks.github && (
                    <a
                        href={socialMediaLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="hover:text-gray-400 transition-colors"
                    >
                        <FaGithub />
                    </a>
                )}
                {socialMediaLinks.linkedin && (
                    <a
                        href={socialMediaLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-gray-400 transition-colors"
                    >
                        <FaLinkedin />
                    </a>
                )}
                {socialMediaLinks.instagram && (
                    <a
                        href={socialMediaLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="hover:text-gray-400 transition-colors"
                    >
                        <FaInstagram />
                    </a>
                )}
                {socialMediaLinks.twitter && (
                    <a
                        href={socialMediaLinks.twitter}
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
