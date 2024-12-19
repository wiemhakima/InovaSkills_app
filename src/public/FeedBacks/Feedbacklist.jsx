import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/public/landing/nav';

const ListeDesCommentaires = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/feedbacks');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Fonction pour supprimer un commentaire
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/feedback/${id}`);
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== id)); // Filtrer le commentaire supprimé
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
    }
  };

  // Fonction pour afficher les étoiles en fonction de la note
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i <= rating ? "yellow" : "gray"}
          viewBox="0 0 20 20"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M10 15.27l-6.18 3.73 1.64-7.03L1 6.24l7.19-.61L10 0l2.81 5.63 7.19.61-4.46 5.73 1.64 7.03L10 15.27z"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">Liste des commentaires</h2>

          {loading ? (
            <div className="text-center text-gray-500">Chargement des commentaires...</div>
          ) : (
            <ul className="space-y-4">
              {feedbacks.length === 0 ? (
                <li className="text-center text-gray-500">Aucun commentaire disponible.</li>
              ) : (
                feedbacks.map((feedback) => (
                  <li key={feedback._id} className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-medium text-gray-800">{feedback.username}</p>
                        <div className="flex space-x-1">
                          {renderStars(feedback.rating)} {/* Affichage des étoiles */}
                        </div>
                        <p className="text-base text-gray-700 mt-2">{feedback.comment}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(feedback._id)}
                        className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default ListeDesCommentaires;
