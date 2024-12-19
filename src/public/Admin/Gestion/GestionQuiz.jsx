import React, { useState } from "react";
import axios from "axios";
import Nav from '../../../components/public/landing/nav';

const GestionQuiz = () => {
  const [title, setTitle] = useState("");
  const [passingScore, setPassingScore] = useState(70);
  const [questions, setQuestions] = useState([{ question: "", options: ["", ""], correctAnswer: "" }]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (index, field, value, optionIndex = null) => {
    const updatedQuestions = [...questions];
    if (field === "option") {
      updatedQuestions[index].options[optionIndex] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const validateForm = () => {
    if (!title.trim()) {
      setMessage("Le titre du quiz est obligatoire.");
      return false;
    }
    if (passingScore < 0 || passingScore > 100) {
      setMessage("Le score de réussite doit être entre 0 et 100.");
      return false;
    }
    for (const question of questions) {
      if (!question.question.trim()) {
        setMessage("Chaque question doit avoir un texte.");
        return false;
      }
      if (question.options.length < 2 || question.options.some((opt) => !opt.trim())) {
        setMessage("Chaque question doit avoir au moins deux options valides.");
        return false;
      }
      if (!question.correctAnswer.trim()) {
        setMessage("Chaque question doit avoir une réponse correcte.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/quizzes", { title, passingScore, questions });
      setMessage("Quiz créé avec succès !");
      setTitle("");
      setPassingScore(70);
      setQuestions([{ question: "", options: ["", ""], correctAnswer: "" }]);
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur lors de la création du quiz.");
    } finally {
      setLoading(false);
    }
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", ""], correctAnswer: "" }]);
  };

  const removeQuestion = (qIndex) => {
    const updatedQuestions = questions.filter((_, index) => index !== qIndex);
    setQuestions(updatedQuestions);
  };

  return (
    <>
      <Nav />
      <div className="gestion-quiz">
        <h2 className="title">Créer un Quiz</h2>
        <form onSubmit={handleSubmit} className="quiz-form">
          <div className="form-group">
            <label className="form-label">Titre du Quiz:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Score de Réussite (%):</label>
            <input
              type="number"
              value={passingScore}
              onChange={(e) => setPassingScore(Number(e.target.value))}
              className="form-input"
              min="0"
              max="100"
            />
          </div>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="question-block">
              <div className="form-group">
                <label className="form-label">Question {qIndex + 1}:</label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleChange(qIndex, "question", e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Options:</label>
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="option-block">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleChange(qIndex, "option", e.target.value, oIndex)}
                      className="option-input"
                      required
                    />
                    {q.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(qIndex, oIndex)}
                        className="remove-option-btn"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(qIndex)}
                  className="add-option-btn"
                >
                  Ajouter une Option
                </button>
              </div>
              <div className="form-group">
                <label className="form-label">Réponse Correcte:</label>
                <input
                  type="text"
                  value={q.correctAnswer}
                  onChange={(e) => handleChange(qIndex, "correctAnswer", e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="remove-question-btn"
              >
                Supprimer 
              </button>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="add-question-btn">
            Ajouter
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Création en cours..." : "Créer le Quiz"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <style jsx>{`

         .gestion-quiz {
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

          .quiz-form {
            display: flex;
            flex-direction: column;
            gap: 30px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .form-label {
            font-weight: bold;
            color: #555;
          }

          .form-input {
            padding: 12px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 5px;
            transition: border-color 0.3s ease;
          }

          .form-input:focus {
            border-color: #5c6bc0;
          }


        .add-option-btn,
        .add-question-btn,
        .submit-btn,
        .remove-option-btn,
        .remove-question-btn {
          background-color: #5c6bc0;
          color: white;
          padding: 8px 16px; /* Réduction de l'espace autour du texte */
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

          .add-option-btn:hover,
          .add-question-btn:hover,
          .submit-btn:hover,
          .remove-option-btn:hover,
          .remove-question-btn:hover {
            background-color: #3f4a91;
          }

          .remove-option-btn {
            background-color: #e53935;
          }

          .remove-option-btn:hover {
            background-color: #d32f2f;
          }

          .message {
            color: #4caf50;
            font-weight: bold;
            text-align: center;
            margin-top: 10px;
          }

          .option-block {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .option-input {
            padding: 10px;
            font-size: 14px;
            border: 1px solid #ddd;
            border-radius: 5px;
            width: 100%;
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

          .remove-question-btn:hover {
            background-color: #d32f2f;
          }

          .question-block {
            border: 1px solid #ddd;
            padding: 20px;
            margin-bottom: 10px;
            border-radius: 8px;
            background-color: #fafafa;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .add-option-btn {
            margin-top: 20px;

          }

          .add-question-btn {
            margin-top: 20px;
          }

          .submit-btn {
            margin-top: 20px;
          }

        `}</style>
      </div>
    </>
  );
};

export default GestionQuiz;
