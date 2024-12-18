import {
  CodeBracketIcon,
  CubeIcon,
  CpuChipIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

const SolutionSection = () => {
  const scrollRef = useRef(null);

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
          <CodeBracketIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />

          {/* Titre */}
          <h3 className="text-4xl font-extrabold leading-tight text-indigo-600 dark:text-indigo-400 sm:text-5xl xl:text-5xl">
            Découvrez Nos Cours En Ligne
          </h3>

          {/* Icône à droite */}
          <PaintBrushIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
        </div>

        {/* Sous-titre */}
        <p className="mt-6 text-lg text-gray-800 dark:text-gray-300 text-center">
          Apprenez de nouvelles compétences et maîtrisez des domaines innovants grâce à nos formations adaptées à vos besoins.
        </p>

        {/* Slider de cours */}
        <div className="relative mt-8">
          {/* Bouton gauche */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-gray-300 dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-400 dark:hover:bg-gray-700"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          </button>

          {/* Cours */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar space-x-6 px-6 scrollbar-none"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <Link to="/cours/react" className={cardClasses}>
              <div className="p-6 text-center">
                <CodeBracketIcon className="h-12 w-12 text-blue-600 mx-auto" />
                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Cours React
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Découvrez comment créer des applications web modernes avec
                  React, le framework JavaScript incontournable.
                </p>
              </div>
            </Link>

            <Link to="/cours/python" className={cardClasses}>
              <div className="p-6 text-center">
                <CubeIcon className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Cours Python
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Apprenez Python pour l'analyse de données, l'IA, et bien plus
                  encore.
                </p>
              </div>
            </Link>

            <Link to="/cours/php" className={cardClasses}>
              <div className="p-6 text-center">
                <CpuChipIcon className="h-12 w-12 text-purple-600 mx-auto" />
                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Cours PHP
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Devenez un développeur expert en PHP et maîtrisez la création
                  de sites web dynamiques.
                </p>
              </div>
            </Link>

            <Link to="/cours/flutter" className={cardClasses}>
              <div className="p-6 text-center">
                <DevicePhoneMobileIcon className="h-12 w-12 text-teal-600 mx-auto" />
                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Cours Flutter
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Apprenez à développer des applications mobiles
                  multiplateformes avec Flutter.
                </p>
              </div>
            </Link>

            <Link to="/cours/design" className={cardClasses}>
              <div className="p-6 text-center">
                <PaintBrushIcon className="h-12 w-12 text-yellow-600 mx-auto" />
                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Cours Design
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Apprenez les bases du design UI/UX pour créer des interfaces
                  intuitives et attrayantes.
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

export default SolutionSection;
