import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificationImage from '../../../assets/img/UI.jpg'; 
import ReactImage from '../../../assets/img/r1.jpg'; 
import NodeImage from '../../../assets/img/n1.jpg'; 

const ActualiteSection = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const navigate = useNavigate();

  // Vérifiez si les cours sont bien définis
  const courses = [
    {
      id: 1,
      title: 'Formation React.js Avancée',
      description: 'Maîtrisez React avec des projets pratiques et des concepts avancés.',
      image: ReactImage,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
      originalPrice: 600,
      discountedPrice: 360,
      offerEnds: '2024-12-20T23:59:59',
    },
    {
      id: 2,
      title: 'Certification en UX/UI Design',
      description: 'Apprenez les bases et les techniques avancées du design UX/UI.',
      image: CertificationImage,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
      originalPrice: 450,
      discountedPrice: 270,
      offerEnds: '2024-12-25T23:59:59',
    },
    {
      id: 3,
      title: 'Développement Web Full-Stack',
      description: 'Devenez un expert en front-end et back-end avec ce cours complet.',
      image: NodeImage,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
      originalPrice: 900,
      discountedPrice: 540,
      offerEnds: '2024-12-30T23:59:59',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedTimeLeft = {};

      courses.forEach(course => {
        const timeDiff = new Date(course.offerEnds) - now;

        if (timeDiff > 0) {
          updatedTimeLeft[course.id] = {
            days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((timeDiff / (1000 * 60)) % 60),
            seconds: Math.floor((timeDiff / 1000) % 60),
          };
        } else {
          updatedTimeLeft[course.id] = null;
        }
      });

      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Dépendances vides car `courses` est une constante

  const addToCart = (course) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const alreadyInCart = currentCart.find(item => item.id === course.id);

    if (!alreadyInCart) {
      currentCart.push(course);
      localStorage.setItem('cart', JSON.stringify(currentCart));
    }

    navigate('/user/Panier');
  };

  return (
    <section className="py-24 bg-blue-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-sans text-4xl font-bold text-blue-800 dark:text-white text-center mb-16">
          Découvrez Nos Cours et Offres
        </h2>
        <div className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          {courses.map(course => (
            <div
              key={course.id}
              className="group w-full max-lg:max-w-xl dark:bg-gray-800 dark:text-gray-300 lg:w-1/3 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="flex items-center">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="rounded-t-2xl w-full h-56 object-cover" // Redimensionner les images
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={course.logo} alt="Logo" className="w-10 h-10 mr-4" />
                  <span className="text-orange-500 font-medium text-lg">Promotion</span>
                </div>
                <h4 className="text-xl text-blue-800 dark:text-white font-bold mb-3">
                  {course.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-6 mb-4">
                  {course.description}
                </p>
                <div className="mb-4">
                  <span className="line-through text-gray-400 text-sm mr-2">{course.originalPrice} DT</span>
                  <span className="text-orange-500 font-semibold text-lg">{course.discountedPrice} DT</span>
                </div>
                <div className="flex justify-between">
                  {timeLeft[course.id] ? (
                    <div>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">Offre valide jusqu'à :</span>
                      <div className="text-sm">
                        {timeLeft[course.id].days} jours, {timeLeft[course.id].hours}h {timeLeft[course.id].minutes}m {timeLeft[course.id].seconds}s
                      </div>
                    </div>
                  ) : (
                    <span className="text-red-500 text-sm">Offre expirée</span>
                  )}
                  <button
                    onClick={() => addToCart(course)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Ajouter au Panier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActualiteSection;
