import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../../components/public/landing/nav';

const GestionAll = () => {
  return (
    <>
      <Nav />
      <div style={styles.container}>
        <h1 style={styles.header}>Gestion des Cours, Quiz et Tests</h1>
        <div style={styles.buttonContainer}>
          <Link to="/cours" style={styles.button}>
            Gestion des Cours
          </Link>
          <Link to="/gestionTest" style={styles.button}>
            Gestion des Tests
          </Link>
          <Link to="/GestionQuiz" style={styles.button}>
            Gestion des Quiz
          </Link>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    margin: 0,
    backgroundColor: '#f4f4f4',
    flexDirection: 'column',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '28px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    background: 'linear-gradient(90deg, #4C6EFD, #9333EA)', // Dégradé du bleu au violet
    '-webkit-background-clip': 'text',
    color: 'transparent',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    padding: '12px 24px',
    margin: '12px',
    fontSize: '18px',
    backgroundColor: '#4C6EFD', // Bleu clair
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
    width: '220px',
  },
  buttonHover: {
    backgroundColor: '#9333EA', // Violet lors du survol
  },
};

export default GestionAll;
