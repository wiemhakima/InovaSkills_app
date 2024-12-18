import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GestionQuiz = () => {

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get("http://localhost:8000/quiz");
        if (response.data && Array.isArray(response.data)) {
          setQuiz(response.data[0]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du quiz : ", error);
      }
    };
    fetchQuiz();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentId = "64b0c8329bcd9a3d4e6f8e92";
    try {
      const response = await axios.post("http://localhost:8000/quiz/submit", {
        studentId,
        quizId: quiz._id,
        answers,
      });
      setResult(response.data);
      setIsModalOpen(true);
    } catch (error) {
      setResult({
        message: error.response?.data?.message || "Erreur lors de la soumission",
        score: 0,
        percentage: 0,
      });
      setIsModalOpen(true);
    }
  };

  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };
  const retryQuiz = () => {
    setIsModalOpen(false);
    setAnswers({});
  };
  const viewCertificate = () => {
    setIsModalOpen(false);
    navigate(`/certificate/${result?.certificate._id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (result?.certificate) {
      // Vérifie si le quiz est réussi et redirige
      if (result.percentage >= 70) { 
        <Link to={`/certificate/${certificateId}`}>Voir le certificat</Link>
        // Par exemple : 50% pour réussir
        // navigate(`/certificate/${result.certificate._id}`);
      }
    }
  };
  

  if (!quiz) return <p className="loading">Chargement...</p>;

  return (
    <>
      <Nav />
    <div className="quiz-container">
      <h2 className="quiz-title">{quiz.title || "Quiz non disponible"}</h2>
      <form onSubmit={handleSubmit} className="quiz-form">
        {quiz.questions?.map((q, index) => (
          <div key={index} className="quiz-question">
            <p className="question-text">{q.question}</p>
            {q.options?.map((option, i) => (
              <label key={i} className="quiz-option">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-button">Soumettre</button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Résultat du Quiz"
        style={{
          content: {
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
          },
        }}
      >
         <h2>Résultat</h2>
        <p>{result?.message}</p>
        {result?.percentage !== undefined && (
          <>
            <p>Score : {result.score} / {quiz.questions.length}</p>
            <p>Pourcentage : {result.percentage.toFixed(2)}%</p>
          </>
        )}

        {/* Ajout d'une logique conditionnelle pour afficher le bon bouton */}
        {result?.percentage >= 70 ? (
          <button
            className="close-modal-button"
            onClick={viewCertificate}
          >
            Voir le certificat
          </button>
        ) : (
          <button
            className="close-modal-button"
            onClick={closeModal}
          >
            Fermer
          </button>
        )}
      </Modal>

      <style>
        {`
          .quiz-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            border-radius: 12px;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .quiz-title {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            color: #333;
            font-weight: bold;
          }

          .quiz-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .quiz-question {
            background-color: #f9f9f9;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid #ddd;
          }

          .question-text {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: #444;
          }

          .quiz-option {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }

          .submit-button {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            color: #fff;
            background-color: #007BFF;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }

          .submit-button:hover {
            background-color: #0056b3;
          }

          .loading {
            text-align: center;
            font-size: 1.5rem;
            color: #555;
          }

          .close-modal-button {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            background-color: #28a745;
            color: #fff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }

          .close-modal-button:hover {
            background-color: #218838;
          }
        `}
      </style>
    </div>
       </>
  );
};

export default GestionQuiz;
