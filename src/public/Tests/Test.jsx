import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/public/landing/nav";
import { Alert, Container } from "react-bootstrap"; // Importation de React-Bootstrap
import { FaExclamationTriangle, FaCheckCircle, FaClipboardList } from "react-icons/fa"; // Icônes pour les alertes et tests

// Styles en CSS-in-JS pour personnaliser l'apparence
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    fontFamily: "'Arial', sans-serif",
    background: "linear-gradient(120deg, #e0f7fa, #fce4ec)",
    minHeight: "100vh",
    margin: 0,
  },
  container: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    maxWidth: "700px",
    width: "100%",
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#4a148c",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  button: {
    background: "#4a148c",
    color: "white",
    padding: "15px 30px",
    border: "none",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
    margin: "15px 0",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  buttonHover: {
    background: "#6a1b9a",
  },
  question: {
    marginBottom: "30px",
  },
  questionText: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  option: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
    fontSize: "16px",
  },
  submitButton: {
    background: "#0288d1",
    color: "white",
    padding: "15px 30px",
    border: "none",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  closeButton: {
    background: "#d32f2f",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
    marginTop: "20px",
  },
  icon: {
    marginRight: "8px",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
    padding: "20px",
    background: "#f1f1f1",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
  },
};

// Composant principal
const TestComponent = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/tests");
        setTests(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tests : ", error);
      }
    };
    fetchTests();
  }, []);



  const handleSubmit = async (e) => {
  e.preventDefault();
  const studentId = "6763f38aa5bfc03490eca365";
  try {
    const response = await axios.post("http://localhost:8000/submit_test", {
      studentId,
      testId: selectedTest._id,
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

  const closeModal = () => {
    setIsModalOpen(false);
    if (result?.certificate) {
      navigate(`/certificate/${result.certificate._id}`);
    }
  };

  return (
    <>
      <Nav /> {/* Intégration du composant Nav */}
      <div style={styles.wrapper}>
        {!tests.length ? (
          <Alert variant="info" style={{ maxWidth: "600px", margin: "20px" }}>
            <Alert.Heading><FaExclamationTriangle /> Chargement des tests...</Alert.Heading>
            <p>Veuillez patienter pendant que les tests sont chargés.</p>
          </Alert>
        ) : !selectedTest ? (
          <TestSelection tests={tests} onSelect={setSelectedTest} />
        ) : (
          <TestDetails
            test={selectedTest}
            answers={answers}
            onSubmit={handleSubmit}
            onAnswerChange={handleAnswerChange}
          />
        )}
        <TestResultModal
          isOpen={isModalOpen}
          result={result}
          selectedTest={selectedTest}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

const TestSelection = ({ tests, onSelect }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>Sélectionnez un Test</h2>
    <div>
      {tests.map((test) => (
        <div
          key={test._id}
          style={styles.card}
          onClick={() => onSelect(test)}
          className="test-card"
        >
          <FaClipboardList style={styles.icon} />
          <strong>{test.title}</strong>
        </div>
      ))}
    </div>
  </div>
);

const TestDetails = ({ test, answers, onSubmit, onAnswerChange }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>{test.title}</h2>
    <form onSubmit={onSubmit}>
      {test.questions?.map((q, index) => (
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

const TestResultModal = ({ isOpen, result, selectedTest, closeModal }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Résultat du Test"
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
    <h2>{result?.percentage >= 70 ? <FaCheckCircle color="green" /> : <FaExclamationTriangle color="red" />} Résultat</h2>
    <p>{result?.message}</p>
    {result?.percentage !== undefined && (
      <>
        <p>Score : {result.score} / {selectedTest.questions.length}</p>
        <p>Pourcentage : {result.percentage.toFixed(2)}%</p>
      </>
    )}
    <button style={styles.closeButton} onClick={closeModal}>
      {result?.percentage >= 70 ? "Voir le certificat" : "Fermer"}
    </button>
  </Modal>
);

export default TestComponent;
