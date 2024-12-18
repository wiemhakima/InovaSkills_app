import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-white to-blue-50 text-gray-700 py-16">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Top */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Votre Compagnie</h3>
            <p className="text-gray-500 mb-4">
              Boostez votre carrière avec des formations adaptées et une interface moderne.
            </p>
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} Tous droits réservés
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-blue-500">Accueil</a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-500">À Propos</a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-500">Services</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-500">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Suivez-nous</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaLinkedinIn size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom (Decorative Waves) */}
        <div className="mt-12 text-center text-gray-400">
          <svg
            className="w-full h-16 text-blue-200"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M0 0h1200v60l-600 60L0 60z"></path>
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
