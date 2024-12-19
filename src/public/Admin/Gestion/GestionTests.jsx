import React, { useState } from "react";
import axios from "axios";
import Nav from '../../../components/public/landing/nav';

const GestionTest = () => {
  const [title, setTitle] = useState("");
  const [passingScore, setPassingScore] = useState(70);
  const [questions, setQuestions] = useState([
    { question: "", options: ["", ""], correctAnswer: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePassingScoreChange = (e) => setPassingScore(e.target.value);

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][e.target.name] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", ""], correctAnswer: "" },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!title || questions.some((q) => !q.question || !q.options[0] || !q.correctAnswer)) {
      setErrorMessage("Tous les champs sont requis.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/create_test", {
        title,
        passingScore,
        questions,
      });
      setSuccessMessage("Test créé avec succès !");
      setTitle("");
      setPassingScore(70);
      setQuestions([{ question: "", options: ["", ""], correctAnswer: "" }]);
    } catch (error) {
      setErrorMessage("Erreur lors de la création du test.");
      console.error(error);
    }
  };

  return (
    <>
      <Nav />
    <div className="gestion-test-container">
      <h1 className="title">Créer un Test</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="gestion-test-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label className="form-label">Titre du test:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-input"
            placeholder="Entrez le titre du test"
            required
          />
        </div>
        <div className="form-section">
          <label className="form-label">Score requis pour réussir:</label>
          <input
            type="number"
            value={passingScore}
            onChange={handlePassingScoreChange}
            className="form-input"
            min="0"
            max="100"
            placeholder="Entrez le score requis"
          />
        </div>

        <h2 className="questions-header">Questions</h2>
        {questions.map((question, index) => (
          <div key={index} className="question-card">
            <div className="form-section">
              <label className="form-label">Question:</label>
              <input
                type="text"
                name="question"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, e)}
                className="form-input"
                placeholder="Entrez la question"
                required
              />
            </div>
            <div className="form-section">
              <label className="form-label">Options:</label>
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  className="form-input"
                  placeholder={`Option ${optionIndex + 1}`}
                  required
                />
              ))}
            </div>
            <div className="form-section">
              <label className="form-label">Réponse correcte:</label>
              <input
                type="text"
                name="correctAnswer"
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(index, e)}
                className="form-input"
                placeholder="Entrez la réponse correcte"
                required
              />
            </div>
            <button type="button" onClick={() => handleRemoveQuestion(index)} className="remove-question-btn">
              Supprimer 
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion} className="add-question-btn">
          Ajouter une question
        </button>
        <br />
        <button type="submit" className="submit-btn">Créer le test</button>
      </form>

      {/* Styles en ligne */}
      <style jsx>{`
        .gestion-test-container {
            max-width: 900px;
            margin: 0 auto;
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            position: relative;  /* Nécessaire pour utiliser 'top' */
            top: 20px;  /* Décalage de 20px vers le bas par rapport à sa position par défaut */
            }

          .title {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
            color:rgb(137, 85, 221);
          }
        .gestion-test-header {
          text-align: center;
          font-size: 2em;
          color: #4b6c8e;
          margin-bottom: 20px;
        }

        .error-message,
        .success-message {
          text-align: center;
          font-size: 1.1em;
          padding: 10px;
          border-radius: 5px;
        }

        .error-message {
          color: #e74c3c;
          background-color: #f8d7da;
        }

        .success-message {
          color: #2ecc71;
          background-color: #d4edda;
        }

        .gestion-test-form {
          display: flex;
          flex-direction: column;
        }

        .form-section {
          margin-bottom: 15px;
        }

        .form-label {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .form-input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1em;
          width: 100%;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #4b6c8e;
          outline: none;
        }

        .questions-header {
          font-size: 1.5em;
          color: #4b6c8e;
          margin-top: 30px;
        }

        .question-card {
          background-color: #ffffff;
          padding: 20px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .add-question-btn,
        .submit-btn {
     background-color: #5c6bc0;
          color: white;
          padding: 8px 16px; /* Réduction de l'espace autour du texte */
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
    
        .add-question-btn:hover,
        .submit-btn:hover {
          background-color: #3e4e68;
        }

        .remove-question-btn {
            background-color: #e53935;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 15px;
            width: 20%;
          }

     
      `}</style>
    </div>
     </>
  );
};

export default GestionTest;
