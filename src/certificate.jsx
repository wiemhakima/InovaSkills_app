import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from './assets/img/log.svg'; 
import Nav from './components/public/landing/nav'; 

const CertificateComponent = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/certificate/${id}`);
        console.log("Certificat récupéré :", response.data);

        if (response?.data) {
          setCertificate(response.data);
        } else {
          setError("Aucune donnée trouvée pour cet ID.");
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Erreur lors de la récupération du certificat."
        );
        console.error("Erreur :", error);
      }
    };

    fetchCertificate();
  }, [id]);

  const handleDownload = async () => {
    const certificateElement = document.getElementById("certificate-content");

    if (!certificateElement) return;

    const canvas = await html2canvas(certificateElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 250);
    pdf.save("certificat.pdf");
  };

  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;
  if (!certificate) return <p>Chargement du certificat...</p>;

  return (
    <>
      <Nav />
      
      <div style={styles.container}>
        <div style={styles.certificate} id="certificate-content">
          <div style={styles.headerContainer}>
            <img src={Logo} alt="InnovaSkilles Logo" style={styles.logo} />
            <h1 style={styles.title}>Certificat d'achèvement</h1>
            <p style={styles.subtitle}>
              Ce certificat est délivré à l'étudiant suivant pour ses performances exceptionnelles
            </p>
          </div>

          <div style={styles.content}>
            <p style={styles.studentInfo}>
              <strong>Étudiant : </strong>{certificate.studentId}
            </p>
            <p style={styles.score}>
              <strong>Score : </strong>{certificate.score}%
            </p>
            <p style={styles.date}>
              <strong>Date : </strong>{new Date(certificate.date).toLocaleDateString()}
            </p>
          </div>

          <div style={styles.signatureContainer}>
            <div style={styles.signatureLine}></div>
            <p style={styles.signatureText}>Signature autorisée</p>
          </div>
        </div>

        {/* Bouton Télécharger centré et plus élégant */}
        <div style={styles.buttonContainer}>
          <button style={styles.downloadButton} onClick={handleDownload}>
            Télécharger le certificat
          </button>
        </div>
      </div>
    </>
  );
};

export default CertificateComponent;

// Styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: '"Roboto", sans-serif',  
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f8f9',  
  },
  certificate: {
    width: '600px', 
    padding: '20px',
    border: '4px solid #d1d8e0',
    borderRadius: '12px',  
    boxShadow: '4px 4px 15px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    position: 'relative',
    marginTop: '60px',
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '20px',
    padding: '10px',
  },
  logo: {
    width: '100px',
    marginBottom: '15px',  
  },
  title: {
    fontSize: '32px',  
    color: '#3a3a3a',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '18px',
    color: '#6c757d',
    marginBottom: '20px',
  },
  content: {
    margin: '20px 0',
    lineHeight: '1.6',
  },
  studentInfo: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#343a40',
  },
  score: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#28a745',
  },
  date: {
    fontSize: '18px',
    color: '#6c757d',
  },
  signatureContainer: {
    marginTop: '40px',
    padding: '10px',
  },
  signatureLine: {
    borderTop: '2px solid #3a3a3a',
    width: '220px',
    margin: '0 auto',
    marginBottom: '10px',
  },
  signatureText: {
    fontSize: '16px',
    color: '#6c757d',
  },
  buttonContainer: {
    marginTop: '40px',
  },
  downloadButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    border: 'none',
    color: '#fff',
    borderRadius: '25px',  // Bordure plus arrondie pour un look plus moderne
    cursor: 'pointer',
    fontSize: '18px',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
  },
};
