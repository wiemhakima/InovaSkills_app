import React from 'react';
import { FaPython } from 'react-icons/fa'; // Icône Python ajoutée

const Python = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-green-600 p-4"> {/* Modification de la couleur de la navbar ici */}
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-xl font-semibold flex items-center">
            <FaPython className="mr-2 text-green-400" />
            Python Academy
          </a>
          <div className="space-x-6">
            <a href="/Landing" className="text-white">Accueil</a>
            <a href="#python-basics" className="text-white">Bases de Python</a>
            <a href="#advanced-concepts" className="text-white">Concepts Avancés</a>
            <a href="#resources" className="text-white">Ressources</a>
          </div>
        </div>
      </nav>

      {/* Main Course Content */}
      <div className="py-12 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center text-yellow-500">
          <FaPython className="mr-3 text-yellow-400" />
          Cours Python
        </h2>
        <p className="text-lg mb-6 text-center">
          Apprenez Python pour l'analyse de données, l'intelligence artificielle, le développement web et bien plus encore.
        </p>

        {/* Introduction Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8" id="python-basics">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-600">
            <FaPython className="mr-2 text-yellow-500" />
            Introduction à Python
          </h3>
          <p className="mb-4">
            Python est un langage de programmation polyvalent et puissant, utilisé dans de nombreux domaines tels que le développement web, l'analyse de données, l'intelligence artificielle, et bien d'autres.
          </p>
          <h4 className="font-bold mb-2 text-yellow-500">Compétences de base à acquérir :</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Comprendre la syntaxe de base de Python</li>
            <li>Manipuler des données avec les structures de données Python (listes, dictionnaires, tuples, etc.)</li>
            <li>Utiliser les bibliothèques Python pour l'analyse de données comme NumPy et pandas</li>
            <li>Créer des scripts Python pour automatiser des tâches</li>
            <li>Travailler avec des bases de données et des API en Python</li>
            <li>Introduire les concepts de l'intelligence artificielle et du machine learning avec Python</li>
          </ul>
        </div>

        {/* Advanced Concepts Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8" id="advanced-concepts">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-orange-500">
            <FaPython className="mr-2 text-orange-400" />
            Concepts Avancés de Python
          </h3>
          <p className="mb-4">
            Approfondissez vos connaissances Python en explorant des sujets plus complexes, comme l'intelligence artificielle et le machine learning.
          </p>
          <h4 className="font-bold mb-2 text-orange-400">Concepts clés :</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Développement d'applications Python pour l'intelligence artificielle</li>
            <li>Utilisation de Python avec TensorFlow et Keras pour le machine learning</li>
            <li>Création d'applications web avec Flask ou Django</li>
            <li>Gestion de bases de données avec SQLAlchemy et Python</li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg" id="resources">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-green-500">
            <FaPython className="mr-2 text-green-400" />
            Ressources Supplémentaires
          </h3>
          <p className="mb-4">
            Voici quelques ressources utiles pour approfondir vos connaissances en Python :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><a href="https://www.python.org/doc/" target="_blank" rel="noopener noreferrer" className="text-blue-600">Documentation officielle de Python</a></li>
            <li><a href="https://www.tensorflow.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600">TensorFlow pour Python</a></li>
            <li><a href="https://www.pandas.pydata.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600">Bibliothèque pandas</a></li>
          </ul>
        </div>

        {/* Final Advice */}
        <div className="mt-6 text-center">
          <h4 className="font-bold text-lg text-yellow-600 mb-2">
            Lancez votre projet Python !
          </h4>
          <p className="text-sm text-gray-600">
            Utilisez <code>python script.py</code> pour exécuter vos scripts Python. Consultez la <a href="https://www.python.org/downloads/" target="_blank" className="text-blue-600">documentation officielle</a> pour plus de détails sur l'installation et l'exécution de Python.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Python;
