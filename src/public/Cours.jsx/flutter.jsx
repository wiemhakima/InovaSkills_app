import React from 'react';
import { FaAndroid } from 'react-icons/fa';  // Icône Android pour Flutter
import { FaCode } from 'react-icons/fa';  // Icône Code
import { FaTools } from 'react-icons/fa'; // Icône Outils
import { FaRocket } from 'react-icons/fa'; // Icône Lancement

const FlutterCourse = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-xl font-semibold flex items-center">
            <FaAndroid className="mr-2 text-blue-400" />
            Flutter Academy
          </a>
          <div className="space-x-6">
            <a href="/Landing" className="text-white">Accueil</a>
            <a href="#flutter-basics" className="text-white">Bases de Flutter</a>
            <a href="#advanced-concepts" className="text-white">Concepts Avancés</a>
            <a href="#resources" className="text-white">Ressources</a>
          </div>
        </div>
      </nav>

      {/* Main Course Content */}
      <div className="py-12 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center">
          <FaAndroid className="mr-3 text-blue-400" />
          Cours Flutter
        </h2>
        <p className="text-lg mb-6 text-center">
          Apprenez à développer des applications mobiles multiplateformes avec Flutter, le framework open-source de Google.
        </p>

        {/* Introduction Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8" id="flutter-basics">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaCode className="mr-2 text-green-500" />
            Introduction à Flutter
          </h3>
          <p className="mb-4">
            Flutter permet de développer des applications mobiles et web en utilisant un seul codebase. Apprenez à créer des interfaces utilisateur élégantes et performantes avec ce framework moderne.
          </p>
          <h4 className="font-bold mb-2">Compétences de base à acquérir :</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Création de widgets Flutter pour une interface fluide</li>
            <li>Gestion de l'état avec <code>Provider</code></li>
            <li>Routage et navigation entre les écrans dans une application Flutter</li>
            <li>Connexion avec des APIs externes pour récupérer des données</li>
          </ul>
        </div>

        {/* Advanced Concepts Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8" id="advanced-concepts">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaTools className="mr-2 text-orange-500" />
            Concepts Avancés de Flutter
          </h3>
          <p className="mb-4">
            Une fois que vous maîtrisez les bases, il est important de comprendre les concepts avancés pour améliorer vos applications.
          </p>
          <h4 className="font-bold mb-2">Concepts clés :</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Gestion d'état complexe avec <code>Riverpod</code> et <code>Bloc</code></li>
            <li>Optimisation des performances avec <code>Flutter DevTools</code></li>
            <li>Création de plugins Flutter pour l'intégration avec les APIs natives</li>
            <li>Utilisation de Firebase pour l'authentification et la gestion des données</li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg" id="resources">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaRocket className="mr-2 text-blue-400" />
            Ressources Supplémentaires
          </h3>
          <p className="mb-4">
            Voici quelques ressources utiles pour approfondir vos connaissances en Flutter :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><a href="https://flutter.dev/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600">Documentation officielle de Flutter</a></li>
            <li><a href="https://flutter.dev/community" target="_blank" rel="noopener noreferrer" className="text-blue-600">Communauté Flutter</a></li>
            <li><a href="https://github.com/flutter/flutter" target="_blank" rel="noopener noreferrer" className="text-blue-600">Code source Flutter sur GitHub</a></li>
          </ul>
        </div>

        {/* Final Advice */}
        <div className="mt-6 text-center">
          <h4 className="font-bold text-lg text-blue-600 mb-2">
            Lancer votre projet Flutter !
          </h4>
          <p className="text-sm text-gray-600">
            Une fois que vous êtes prêt, vous pouvez utiliser <code>flutter create</code> pour démarrer rapidement un projet Flutter local. Consultez la <a href="https://flutter.dev/docs/get-started/install" target="_blank" className="text-blue-600">documentation officielle</a> pour plus de détails.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlutterCourse;
