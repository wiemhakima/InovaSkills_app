import React from 'react';
import { FaCode, FaDatabase, FaLock, FaCogs } from 'react-icons/fa';

const Php = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-green-600 p-4"> {/* Navbar verte */}
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-xl font-semibold flex items-center">
            <FaCode className="mr-2 text-green-400" />
            PHP Academy
          </a>
          <div className="space-x-6">
            <a href="/Landing" className="text-white">Accueil</a>
            <a href="#php-basics" className="text-white">Bases de PHP</a>
            <a href="#advanced-concepts" className="text-white">Concepts Avancés</a>
            <a href="#resources" className="text-white">Ressources</a>
          </div>
        </div>
      </nav>

      {/* Main Course Content */}
      <div className="py-12 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center text-indigo-600"> {/* Changement de couleur ici */}
          <FaCode className="mr-3 text-indigo-500" />
          Cours PHP
        </h2>
        <p className="text-lg mb-6 text-center text-gray-700">
          Devenez un développeur expert en PHP et maîtrisez la création de sites web dynamiques et interactifs.
        </p>

        {/* Introduction Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8" id="php-basics">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-600"> {/* Changement de couleur ici */}
            <FaCode className="mr-2 text-blue-500" />
            Introduction à PHP
          </h3>
          <p className="mb-4 text-gray-700">
            PHP est un langage de script côté serveur utilisé pour développer des applications web dynamiques. Apprenez à travailler avec les bases de données et à générer du contenu dynamique pour vos sites web.
          </p>
          <h4 className="font-bold mb-2 text-blue-500">Compétences de base à acquérir :</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Création de scripts PHP pour gérer des formulaires</li>
            <li>Interaction avec des bases de données MySQL</li>
            <li>Gestion des sessions et des cookies</li>
            <li>Création de contenu dynamique pour les pages web</li>
          </ul>
        </div>

        {/* Advanced Concepts Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8" id="advanced-concepts">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-orange-600"> {/* Couleur orange pour cette section */}
            <FaCogs className="mr-2 text-orange-500" />
            Concepts Avancés de PHP
          </h3>
          <p className="mb-4 text-gray-700">
            Approfondissez vos connaissances PHP en travaillant sur des applications plus complexes et sécurisées.
          </p>
          <h4 className="font-bold mb-2 text-orange-500">Concepts clés :</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Création de services web avec PHP et REST</li>
            <li>Utilisation de PHP pour la gestion de contenu dynamique avec des CMS comme WordPress</li>
            <li>Gestion de la sécurité avec PHP pour éviter les attaques courantes (SQL Injection, XSS, CSRF)</li>
            <li>Utilisation de frameworks PHP comme Laravel pour le développement rapide d'applications</li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg" id="resources">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-purple-600"> {/* Couleur violette pour cette section */}
            <FaDatabase className="mr-2 text-purple-500" />
            Ressources Supplémentaires
          </h3>
          <p className="mb-4 text-gray-700">
            Voici quelques ressources utiles pour approfondir vos connaissances en PHP :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><a href="https://www.php.net/docs.php" target="_blank" rel="noopener noreferrer" className="text-purple-600">Documentation officielle de PHP</a></li>
            <li><a href="https://laravel.com/" target="_blank" rel="noopener noreferrer" className="text-purple-600">Framework Laravel</a></li>
            <li><a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer" className="text-purple-600">Base de données MySQL</a></li>
          </ul>
        </div>

        {/* Final Advice */}
        <div className="mt-6 text-center">
          <h4 className="font-bold text-lg text-teal-600 mb-2"> {/* Couleur teal pour cette section */}
            Lancez votre projet PHP !
          </h4>
          <p className="text-sm text-gray-600">
            Utilisez <code>php -S localhost:8000</code> pour lancer un serveur local PHP. Consultez la <a href="https://www.php.net/manual/fr/install.php" target="_blank" className="text-teal-600">documentation officielle</a> pour plus de détails sur l'installation et le démarrage rapide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Php;
