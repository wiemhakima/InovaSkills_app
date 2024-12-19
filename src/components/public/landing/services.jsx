import {
  CodeBracketIcon,
  CubeIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import React from "react";

const Services = () => {
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

        {/* Services centrés sur la même ligne */}
        <div className="mt-8 flex justify-center space-x-6 overflow-x-auto">
          {/* Service 1 */}
          <div className={cardClasses}>
            <div className="p-6 text-center">
              <UsersIcon className="h-12 w-12 text-blue-600 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                Consulting IT
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Bénéficiez de l’expertise de nos consultants pour transformer vos systèmes IT.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className={cardClasses}>
            <CubeIcon className="h-12 w-12 text-green-600 mx-auto" />
            <div className="p-6 text-center">
              <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                Développement Web
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Créez des sites web modernes et responsives avec nos services de développement.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className={cardClasses}>
            <DevicePhoneMobileIcon className="h-12 w-12 text-teal-600 mx-auto" />
            <div className="p-6 text-center">
              <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                Applications Mobiles
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Développez des applications mobiles performantes pour toutes plateformes.
              </p>
            </div>
          </div>

          {/* Service 4 */}
          <div className={cardClasses}>
            <CpuChipIcon className="h-12 w-12 text-purple-600 mx-auto" />
            <div className="p-6 text-center">
              <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                SEO & Marketing Digital
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Optimisez la visibilité de votre site avec notre expertise en SEO et marketing digital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
