import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa'; // Icône d'avertissement

const Unauthorized = () => {
  return (
    <Container className="mt-5">
      <Alert variant="danger" className="custom-alert">
        <FaExclamationTriangle className="alert-icon" />
        <Alert.Heading>Accès Interdit</Alert.Heading>
        <p>
          Vous n'avez pas la permission d'accéder à cette page. Veuillez contacter l'administrateur si vous pensez qu'il s'agit d'une erreur.
        </p>
      </Alert>

      <style jsx>{`
        .custom-alert {
          display: flex;
          align-items: center;
          padding: 50px;
          border-radius: 12px;
          margin-bottom: 20px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, opacity 0.5s ease;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(145deg, #f44336, #e53935); /* Dégradé rouge */
          opacity: 0;
          animation: fadeIn 1s forwards; /* Animation d'apparition */
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .custom-alert:hover {
          transform: translateY(-10px);
        }

        .alert-icon {
          font-size: 32px;
          margin-right: 100px;
          color: #fff;
        }

        .custom-alert .alert-heading {
          font-size: 1.7rem;
          font-weight: bold;
          color: #fff;
        }

        .custom-alert p {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #fff;
        }
      `}</style>
    </Container>
  );
};

export default Unauthorized;
