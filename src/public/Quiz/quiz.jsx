import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCertificate } from "react-icons/fa"; // Importation d'une icône
import Nav from "../../components/public/landing/nav";

// Styles en CSS-in-JS
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(120deg, #e0f7fa, #fce4ec)",
    minHeight: "100vh",
    margin: 0,
    transition: "background-color 0.3s ease",
  },
  loading: {
    fontSize: "18px",
    color: "#444",
    marginTop: "50px",
  },
  container: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    maxWidth: "700px",
    width: "100%",
    textAlign: "center",
    marginBottom: "30px",
    transition: "box-shadow 0.3s ease",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#4a148c",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  timer: {
    fontSize: "20px",
    color: "#d32f2f",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  button: {
    background: "#4a148c",
    color: "#fff",
    padding: "12px 25px",
    border: "none",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
    margin: "15px 0",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  buttonHover: {
    background: "#6a1b9a",
    transform: "scale(1.05)",
  },
  question: {
    marginBottom: "25px",
  },
  questionText: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#333",
  },
  option: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
    fontSize: "16px",
    cursor: "pointer",
  },
  submitButton: {
    background: "#0288d1",
    color: "#fff",
    padding: "12px 25px",
    border: "none",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  submitButtonHover: {
    background: "#0277bd",
    transform: "scale(1.05)",
  },
  closeButton: {
    background: "#d32f2f",
    color: "#fff",
    padding: "12px 25px",
    border: "none",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  quizBlock: {
    background: "#f1f1f1",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
  },
  quizDescription: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "15px",
    width: "80%",
  },
  quizTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#4a148c",
  },
  icon: {
    fontSize: "40px",
    color: "#4a148c",
    marginRight: "15px",
    transition: "transform 0.3s ease",
  },
  certIntro: {
    fontSize: "14px",
    color: "#333",
    fontStyle: "italic",
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
  const [timeLeft, setTimeLeft] = useState(20); // Timer initialisé à 20 secondes (ajout de 10 secondes)
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

  useEffect(() => {
    if (selectedQuiz) {
      // Démarrer le compte à rebours pour chaque question du quiz
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer); // Stopper le timer lorsqu'il atteint 0
            // Soumettre les réponses lorsque le temps est écoulé
            handleSubmit();
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer); // Nettoyage du timer
    }
  }, [selectedQuiz]);

  const handleQuizSelection = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault(); // Si e est défini, empêcher l'événement par défaut
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
          <QuizSelection
            quizzes={quizzes}
            onSelect={setSelectedQuiz}
          />
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
        {/* Affichage du compte à rebours */}
        {selectedQuiz && (
          <div style={styles.timer}>Temps restant: {timeLeft} secondes</div>
        )}
      </div>
    </>
  );
};

// Sélection du quiz avec icône et introduction
const QuizSelection = ({ quizzes, onSelect }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>Sélectionnez un certifcat </h2>
    <div>
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          style={styles.quizBlock}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <FaCertificate style={styles.icon} />
          <div style={{ width: "75%" }}>
            <h3 style={styles.quizTitle}>{quiz.title}</h3>
            <p style={styles.quizDescription}>{quiz.description}</p>
            <p style={styles.certIntro}>{quiz.certificationIntroduction}</p>
          </div>
          <button onClick={() => onSelect(quiz)} style={styles.button}>
            Démarrer
          </button>
        </div>
      ))}
    </div>
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
        Envoyer
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
        maxWidth: "600px",
        margin: "auto",
        padding: "30px",
        borderRadius: "12px",
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
