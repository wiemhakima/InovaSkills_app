import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../../components/public/landing/nav';

function GestionQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [passingScore, setPassingScore] = useState('');
  const [newQuizQuestions, setNewQuizQuestions] = useState([{ question: '', answer: '' }]);
  const [editQuiz, setEditQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Récupérer la liste des quiz
  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/quizzes');
      setQuizzes(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la récupération des quiz.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Fonction pour ajouter un quiz
  const handleAddQuiz = async (e) => {
    e.preventDefault();

    const newQuiz = {
      title: newQuizTitle,
      passingScore: passingScore,
      questions: newQuizQuestions,
    };

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/quizzes', newQuiz);
      setQuizzes([...quizzes, response.data]);
      setNewQuizTitle('');
      setPassingScore('');
      setNewQuizQuestions([{ question: '', answer: '' }]);
      setLoading(false);
    } catch (err) {
      console.error('Erreur', err);
      setError('Erreur lors de l\'ajout du quiz.');
      setLoading(false);
    }
  };

  // Fonction pour modifier un quiz
  const handleUpdateQuiz = async (e) => {
    e.preventDefault();

    if (!editQuiz._id) {
      console.error('ID du quiz introuvable.');
      setError('ID du quiz incorrecte.');
      return;
    }

    const updatedQuiz = {
      title: editQuiz.title,
      passingScore: editQuiz.passingScore,
      questions: editQuiz.questions,
    };

    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8000/quizzes/${editQuiz._id}`, updatedQuiz);
      fetchQuizzes();
      setEditQuiz(null);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la mise à jour', err);
      setError('Erreur lors de la mise à jour du quiz.');
      setLoading(false);
    }
  };

  // Fonction pour supprimer un quiz
  const handleDeleteQuiz = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/quizzes/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la suppression du quiz.');
      setLoading(false);
    }
  };

  // Fonction pour gérer le changement de question
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...newQuizQuestions];
    updatedQuestions[index].question = value;
    setNewQuizQuestions(updatedQuestions);
  };

  // Fonction pour gérer le changement de réponse
  const handleAnswerChange = (index, value) => {
    const updatedQuestions = [...newQuizQuestions];
    updatedQuestions[index].answer = value;
    setNewQuizQuestions(updatedQuestions);
  };

  // Fonction pour ajouter une nouvelle question
  const handleAddQuestion = () => {
    setNewQuizQuestions([...newQuizQuestions, { question: '', answer: '' }]);
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Gestion des Quiz</h1>

        {error && (
          <div className="text-red-600 bg-red-100 p-4 rounded-lg mb-6 shadow-md">
            <strong>Erreur : </strong> {error}
          </div>
        )}

        {/* Formulaire pour ajouter un quiz */}
        <form
          onSubmit={handleAddQuiz}
          className="flex flex-col md:flex-row md:space-x-4 bg-white p-4 rounded-lg shadow-lg mb-8"
        >
          <input
            type="text"
            value={newQuizTitle}
            onChange={(e) => setNewQuizTitle(e.target.value)}
            placeholder="Titre du Quiz"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            value={passingScore}
            onChange={(e) => setPassingScore(e.target.value)}
            placeholder="Score de réussite"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 md:mb-0"
            required
          />
          <div className="space-y-4 w-full mb-4">
            {newQuizQuestions.map((q, idx) => (
              <div key={idx} className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(idx, e.target.value)}
                  placeholder={`Question ${idx + 1}`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  value={q.answer}
                  onChange={(e) => handleAnswerChange(idx, e.target.value)}
                  placeholder={`Réponse ${idx + 1}`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Ajouter une Question
            </button>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Ajouter le Quiz
          </button>
        </form>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Liste des Quiz</h2>
        <ul className="space-y-2">
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
              <div>
                <p className="text-lg font-medium">Titre : {quiz.title}</p>
                <p className="text-sm text-gray-600">Score de réussite : {quiz.passingScore}%</p>
                <p className="text-sm text-gray-600">Questions : {quiz.questions.length}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditQuiz({ ...quiz })}
                  className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Formulaire pour modifier un quiz */}
        {editQuiz && (
          <form onSubmit={handleUpdateQuiz} className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Modifier le Quiz</h3>
            <input
              type="text"
              value={editQuiz.title}
              onChange={(e) => setEditQuiz({ ...editQuiz, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
            />
            <input
              type="number"
              value={editQuiz.passingScore}
              onChange={(e) => setEditQuiz({ ...editQuiz, passingScore: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
            />
            {editQuiz.questions.map((q, idx) => (
              <div key={idx} className="space-y-2 mb-4">
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => {
                    const updatedQuestions = [...editQuiz.questions];
                    updatedQuestions[idx].question = e.target.value;
                    setEditQuiz({ ...editQuiz, questions: updatedQuestions });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={q.answer}
                  onChange={(e) => {
                    const updatedQuestions = [...editQuiz.questions];
                    updatedQuestions[idx].answer = e.target.value;
                    setEditQuiz({ ...editQuiz, questions: updatedQuestions });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Mettre à jour
              </button>
              <button
                type="button"
                onClick={() => setEditQuiz(null)}
                className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default GestionQuiz;
