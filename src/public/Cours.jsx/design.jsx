import React from 'react';
import { FaPaintBrush } from 'react-icons/fa'; // Icône ajoutée pour représenter le design

const Design = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-indigo-600 p-4"> {/* Couleur de la navbar changée pour un ton violet / indigo */}
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-xl font-semibold flex items-center">
            <FaPaintBrush className="mr-2 text-indigo-400" />
            Design Academy
          </a>
          <div className="space-x-6">
            <a href="/" className="text-white">Accueil</a>
            <a href="#design-basics" className="text-white">Bases du Design</a>
            <a href="#advanced-concepts" className="text-white">Concepts Avancés</a>
            <a href="#resources" className="text-white">Ressources</a>
          </div>
        </div>
      </nav>

      {/* Main Course Content */}
      <div className="py-12 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center text-yellow-500">
          <FaPaintBrush className="mr-3 text-yellow-400" />
          Cours Design UI/UX
        </h2>
        <p className="text-lg mb-6 text-center">
          Apprenez les bases du design UI/UX pour créer des interfaces intuitives et attrayantes qui améliorent l'expérience utilisateur.
        </p>

        {/* Introduction Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8" id="design-basics">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-600">
            <FaPaintBrush className="mr-2 text-yellow-500" />
            Introduction au Design UI/UX
          </h3>
          <p className="mb-4">
            Le design UI/UX se concentre sur la création de produits qui offrent une expérience utilisateur fluide et agréable. Apprenez à concevoir des interfaces modernes, ergonomiques et fonctionnelles.
          </p>
          <h4 className="font-bold mb-2 text-yellow-500">Compétences de base à acquérir :</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Principes fondamentaux du design UI/UX</li>
            <li>Création de wireframes et de prototypes interactifs</li>
            <li>Test utilisateur et optimisation de l'interface pour une meilleure expérience</li>
            <li>Utilisation des outils de design populaires comme Figma et Sketch</li>
          </ul>
        </div>

        {/* Advanced Concepts Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8" id="advanced-concepts">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-indigo-500">
            <FaPaintBrush className="mr-2 text-indigo-400" />
            Concepts Avancés du Design UI/UX
          </h3>
          <p className="mb-4">
            Approfondissez vos connaissances en design UX/UI en explorant des concepts avancés et en apprenant à travailler avec des équipes de développement pour créer des produits cohérents.
          </p>
          <h4 className="font-bold mb-2 text-indigo-400">Concepts clés :</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Design responsive et adaptatif</li>
            <li>Création d'interfaces inclusives et accessibles</li>
            <li>Conception centrée sur l'utilisateur et recherche UX</li>
            <li>Tests A/B et analyse des résultats pour améliorer les interfaces</li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg" id="resources">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-indigo-500">
            <FaPaintBrush className="mr-2 text-indigo-400" />
            Ressources Supplémentaires
          </h3>
          <p className="mb-4">
            Voici quelques ressources utiles pour approfondir vos connaissances en design UI/UX :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><a href="https://www.smashingmagazine.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600">Smashing Magazine (Design)</a></li>
            <li><a href="https://www.nngroup.com/articles/ten-usability-heuristics/" target="_blank" rel="noopener noreferrer" className="text-blue-600">Heuristiques de Nielsen Norman Group</a></li>
            <li><a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600">Outil Figma pour le design collaboratif</a></li>
          </ul>
        </div>

        {/* Final Advice */}
        <div className="mt-6 text-center">
          <h4 className="font-bold text-lg text-yellow-600 mb-2">
            Lancez votre projet Design !
          </h4>
          <p className="text-sm text-gray-600">
            Utilisez <code>Figma</code> ou <code>Sketch</code> pour commencer à concevoir vos interfaces. Consultez les <a href="https://www.smashingmagazine.com/" target="_blank" className="text-blue-600">articles de Smashing Magazine</a> pour plus de conseils sur le design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Design;
