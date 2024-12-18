import React from 'react';
import { FaReact, FaCode, FaTools, FaRocket, FaHome, FaUser, FaCog, FaProjectDiagram } from 'react-icons/fa';

const ReactCourse = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-xl font-semibold flex items-center">
            <FaReact className="mr-2" />
            React Academy
          </a>
          <div className="space-x-6">
            <a href="/Landing" className="text-white">Accueil</a>
            <a href="#react-basics" className="text-white">Bases de React</a>
            <a href="#advanced-concepts" className="text-white">Concepts Avancés</a>
            <a href="#resources" className="text-white">Ressources</a>
          </div>
        </div>
      </nav>

      {/* Main Course Content */}
      <div className="py-12 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center">
          <FaReact className="mr-3 text-blue-500" />
          Cours React
        </h2>
        <p className="text-lg mb-6 text-center">
          Explorez React en profondeur : apprenez les bases, les concepts avancés, et comment créer des applications web modernes.
        </p>

        {/* Introduction Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8" id="react-basics">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaCode className="mr-2 text-green-500" />
            Introduction à React
          </h3>
          <p className="mb-4">
            React est une bibliothèque JavaScript populaire pour construire des interfaces utilisateur dynamiques et réactives. Découvrez comment React vous permet de créer des composants modulaires et réutilisables.
          </p>
          <h4 className="font-bold mb-2">Compétences de base à acquérir :</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Création de composants fonctionnels et basés sur des classes</li>
            <li>Utilisation de <code>useState</code> et <code>useEffect</code> pour la gestion de l'état</li>
            <li>Routage avec React Router</li>
            <li>Interaction avec des APIs externes</li>
          </ul>
        </div>

        {/* Advanced Concepts Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8" id="advanced-concepts">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaTools className="mr-2 text-orange-500" />
            Concepts Avancés de React
          </h3>
          <p className="mb-4">
            Une fois les bases maîtrisées, il est important de comprendre les concepts plus avancés de React, tels que le contexte, les hooks personnalisés, et l'optimisation des performances des applications React.
          </p>
          <h4 className="font-bold mb-2">Concepts clés :</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Context API pour gérer l'état global</li>
            <li>Création de hooks personnalisés</li>
            <li>Optimisation des performances avec React.memo et useMemo</li>
            <li>Suspense et React.lazy pour le chargement différé des composants</li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg" id="resources">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaRocket className="mr-2 text-blue-500" />
            Ressources Supplémentaires
          </h3>
          <p className="mb-4">
            Voici quelques ressources utiles pour approfondir vos connaissances en React :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer" className="text-blue-600">Documentation officielle de React</a></li>
            <li><a href="https://reactjs.org/community/support.html" target="_blank" rel="noopener noreferrer" className="text-blue-600">Communauté et support React</a></li>
            <li><a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer" className="text-blue-600">Code source React sur GitHub</a></li>
          </ul>
        </div>

        {/* Final Advice */}
        <div className="mt-6 text-center">
          <h4 className="font-bold text-lg text-blue-600 mb-2">
            Lancer votre Projet React !
          </h4>
          <p className="text-sm text-gray-600">
            Une fois que vous êtes prêt, vous pouvez utiliser <code>create-react-app</code> pour démarrer rapidement un projet React local. Consultez la <a href="https://reactjs.org/docs/create-a-new-react-app.html" target="_blank" className="text-blue-600">documentation officielle</a> pour plus de détails.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReactCourse;
