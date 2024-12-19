import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../../components/public/landing/nav';

const FormulaireDeFeedback = () => {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = { username, rating, comment };
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/feedback', feedback);
      alert('Feedback soumis avec succès');
      console.log(response.data);
    } catch (error) {
      setError('Une erreur est survenue lors de la soumission de votre feedback. Veuillez réessayer.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-indigo-600 text-center mb-6">Formulaire de Commentaire</h2>

          {error && (
            <div className="text-red-600 bg-red-100 p-4 rounded-lg mb-6 shadow-md">
              <strong>Erreur : </strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium">Nom d'utilisateur :</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="rating" className="block text-gray-700 font-medium">Évaluation :</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => handleStarClick(star)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={star <= rating ? "yellow" : "gray"}
                    viewBox="0 0 20 20"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.27l-6.18 3.73 1.64-7.03L1 6.24l7.19-.61L10 0l2.81 5.63 7.19.61-4.46 5.73 1.64 7.03L10 15.27z"
                    />
                  </svg>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="comment" className="block text-gray-700 font-medium">Commentaire :</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full px-6 py-3 text-white rounded-lg ${loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              disabled={loading}
            >
              {loading ? 'Soumission en cours...' : 'Soumettre le feedback'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormulaireDeFeedback;
