import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/public/landing/nav";

// Styles en CSS-in-JS
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    background: "linear-gradient(120deg, #e0f7fa, #fce4ec)",
    minHeight: "100vh",
    margin: 0,
  },
  loading: {
    fontSize: "18px",
    color: "#555",
    marginTop: "50px",
  },
  container: {
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#4a148c",
    marginBottom: "20px",
  },
  button: {
    background: "#4a148c",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    margin: "10px 0",
  },
  buttonHover: {
    background: "#6a1b9a",
  },
  question: {
    marginBottom: "20px",
  },
  questionText: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0",
  },
  submitButton: {
    background: "#0288d1",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  submitButtonHover: {
    background: "#0277bd",
  },
  closeButton: {
    background: "#d32f2f",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

// Composant principal
const QuizComponent = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/quiz");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des quiz : ", error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleQuizSelection = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentId = "64b0c8329bcd9a3d4e6f8e92";
    try {
      const response = await axios.post("http://localhost:8000/quiz/submit", {
        studentId,
        quizId: selectedQuiz._id,
        answers,
      });
      setResult(response.data);
    } catch (error) {
      setResult({
        message: error.response?.data?.message || "Erreur lors de la soumission",
        score: 0,
        percentage: 0,
      });
    } finally {
      setIsModalOpen(true);
    }
  };

  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (result?.certificate) {
      navigate(`/certificate/${result.certificate._id}`);
    }
  };

  return (
    <>
      <Nav />
      <div style={styles.wrapper}>
        {!quizzes.length ? (
          <p style={styles.loading}>Chargement des quiz...</p>
        ) : !selectedQuiz ? (
          <QuizSelection quizzes={quizzes} onSelect={setSelectedQuiz} />
        ) : (
          <QuizDetails
            quiz={selectedQuiz}
            answers={answers}
            onSubmit={handleSubmit}
            onAnswerChange={handleAnswerChange}
          />
        )}
        <QuizResultModal
          isOpen={isModalOpen}
          result={result}
          selectedQuiz={selectedQuiz}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

// Sélection du quiz
const QuizSelection = ({ quizzes, onSelect }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>Sélectionnez un Quiz</h2>
    <ul>
      {quizzes.map((quiz) => (
        <li key={quiz._id}>
          <button onClick={() => onSelect(quiz)} style={styles.button}>
            {quiz.title}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

// Détails du quiz
const QuizDetails = ({ quiz, answers, onSubmit, onAnswerChange }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>{quiz.title}</h2>
    <form onSubmit={onSubmit}>
      {quiz.questions?.map((q, index) => (
        <div key={index} style={styles.question}>
          <p style={styles.questionText}>{q.question}</p>
          {q.options?.map((option, i) => (
            <label key={i} style={styles.option}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={(e) => onAnswerChange(index, e.target.value)}
                required
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button type="submit" style={styles.submitButton}>
        Soumettre
      </button>
    </form>
  </div>
);

// Modal de résultat du quiz
const QuizResultModal = ({ isOpen, result, selectedQuiz, closeModal }) => (
  <Modal
    isOpen={isOpen}
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
        <p>Score : {result.score} / {selectedQuiz.questions.length}</p>
        <p>Pourcentage : {result.percentage.toFixed(2)}%</p>
      </>
    )}
    <button style={styles.closeButton} onClick={closeModal}>
      {result?.percentage >= 70 ? "Voir le certificat" : "Fermer"}
    </button>
  </Modal>
);

export default QuizComponent;
