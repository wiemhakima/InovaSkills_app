import React from "react";
import NavBar from "../components/public/landing/navBar";

const ResourcesPage = () => {
  return (
    <>
      <NavBar />
      <div className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Page Header */}
          <h1 className="text-5xl font-extrabold text-gray-800 sm:text-6xl lg:text-7xl text-center dark:text-white">
            Ressources
          </h1>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-300 text-center">
            Découvrez des ressources utiles pour améliorer vos compétences et avancer dans votre parcours.
          </p>

          {/* Categories Section */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Category 1: Guides */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Guides et Tutoriels
              </h3>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Accédez à des guides complets et des tutoriels pour vous accompagner dans vos projets.
              </p>
              <a href="/guides" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                Voir les guides
              </a>
            </div>

            {/* Category 2: Documents */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Documents à Télécharger
              </h3>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Téléchargez des documents, fiches pratiques et plus encore pour approfondir vos connaissances.
              </p>
              <a href="/documents" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                Télécharger les documents
              </a>
            </div>

            {/* Category 4: Outils */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Outils et Applications
              </h3>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Découvrez des outils et applications pour améliorer vos projets professionnels.
              </p>
              <a href="/tools" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                Explorer les outils
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourcesPage;
