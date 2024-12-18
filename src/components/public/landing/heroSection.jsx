import { FaCheckCircle } from "react-icons/fa";
import hero from "../../../assets/img/hero.png";

const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 lg:py-16"> {/* Ajusté lg:py-24 à lg:py-16 */}
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 xl:gap-20 items-center">
            {/* Text Section */}
            <div data-aos="fade-up">
              <h1 className="text-5xl font-extrabold text-gray-800 sm:text-6xl lg:text-7xl lg:leading-tight dark:text-white">
                Boostez vos{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  compétences
                </span>{" "}
                avec{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  confiance !
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-700 dark:text-gray-300">
                Accédez à des formations interactives, conçues pour transformer
                vos ambitions en réussites concrètes.
              </p>
              <ul className="mt-6 space-y-3 text-lg text-gray-700 dark:text-gray-400">
                <li className="flex items-center">
                  <FaCheckCircle className="text-blue-600 dark:text-blue-500 mr-2" />
                  Des cours adaptés à tous les niveaux
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-blue-600 dark:text-blue-500 mr-2" />
                  Une interface simple et moderne
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-blue-600 dark:text-blue-500 mr-2" />
                  Certification à la clé
                </li>
              </ul>
            </div>
            {/* End Text Section */}

            {/* Image Section */}
            <div className="relative" data-aos="zoom-in">
              <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
                <img
                  className="w-full rounded-lg"
                  src={hero}
                  alt="Boostez vos compétences"
                />
              </div>
              <div className="absolute inset-0 border-[6px] border-dashed border-blue-200 rounded-2xl -z-10"></div>

              {/* Decorative Circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-lg"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-40 blur-lg"></div>
            </div>
            {/* End Image Section */}
          </div>
          {/* End Grid */}
        </div>

        {/* Decorative Waves */}
        <div className="absolute inset-x-0 bottom-0">
          <svg
            className="w-full h-24 text-blue-100 dark:text-gray-700"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M0 0h1200v60l-600 60L0 60z"></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
