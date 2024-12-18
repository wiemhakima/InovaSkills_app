import {
  CodeBracketIcon,
  CubeIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const scrollRef = useRef(null);

  // Fonction pour faire défiler les services à gauche ou à droite
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const cardClasses =
    "min-w-[250px] max-w-[250px] flex-shrink-0 bg-white dark:bg-gray-800 hover:shadow-lg shadow-md rounded-xl duration-200";

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900 sm:py-12 lg:py-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Titre principal avec icônes */}
        <div
          data-aos="zoom-in"
          className="flex items-center justify-center max-w-xl mx-auto text-center xl:max-w-2xl space-x-4"
        >
          {/* Icône à gauche */}
          <CodeBracketIcon className="h-10 w-10 text-purple-600 dark:text-purple-400" />

          {/* Titre */}
          <h3 className="text-4xl font-extrabold leading-tight text-purple-600 dark:text-purple-400 sm:text-5xl xl:text-5xl">
            Nos Services Innovants
          </h3>

          {/* Icône à droite */}
          <CloudIcon className="h-10 w-10 text-purple-600 dark:text-purple-400" />
        </div>

        {/* Sous-titre */}
        <p className="mt-6 text-lg text-gray-800 dark:text-gray-300 text-center">
          Explorez nos services variés et découvrez des solutions adaptées à vos besoins.
        </p>

        {/* Slider de services */}
        <div className="relative mt-8">
          {/* Bouton gauche */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-gray-300 dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-400 dark:hover:bg-gray-700"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          </button>

          {/* Services */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar space-x-6 px-6 scrollbar-none"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <Link to="/services/consulting" className={cardClasses}>
              <div className="p-6 text-center">
                <UsersIcon className="h-12 w-12 text-blue-600 mx-auto" />
                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Consulting IT
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Bénéficiez de l’expertise de nos consultants pour transformer vos systèmes IT.
                </p>
              </div>
            </Link>

            <Link to="/services/web-dev" className={cardClasses}>
              <CubeIcon className="h-12 w-12 text-green-600 mx-auto" />
              <div className="p-6 text-center">
                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Développement Web
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Créez des sites web modernes et responsives avec nos services de développement.
                </p>
              </div>
            </Link>

            <Link to="/services/mobile-apps" className={cardClasses}>
              <DevicePhoneMobileIcon className="h-12 w-12 text-teal-600 mx-auto" />
              <div className="p-6 text-center">
                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Applications Mobiles
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Développez des applications mobiles performantes pour toutes plateformes.
                </p>
              </div>
            </Link>

            <Link to="/services/seo" className={cardClasses}>
              <CpuChipIcon className="h-12 w-12 text-purple-600 mx-auto" />
              <div className="p-6 text-center">
                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                  SEO & Marketing Digital
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Optimisez la visibilité de votre site avec notre expertise en SEO et marketing digital.
                </p>
              </div>
            </Link>
          </div>

          {/* Bouton droit */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-gray-300 dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-400 dark:hover:bg-gray-700"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
