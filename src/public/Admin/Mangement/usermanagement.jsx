import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import Nav from '../../../components/public/landing/nav';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Récupération de la liste des utilisateurs
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    }
  };

  const ProtectedRoute = ({ children, user }) => {
    if (!user || user.role !== 'admin') {
      return <Navigate to="/unauthorized" />;
    }
    return children;
  };

  const handleUpdate = async (id, newData) => {
    try {
      await axios.put(`http://localhost:8000/users/${id}`, newData);
      alert("Utilisateur mis à jour avec succès !");
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      fetchUsers(); // Rafraîchit la liste des utilisateurs après suppression
      setShowModal(false); // Ferme la fenêtre modale après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };
  
  //

  const token = localStorage.getItem('token');

  const handleApprove = async (id, approved) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/users/${id}`,
        { approved },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(approved ? "Utilisateur approuvé !" : "Utilisateur non approuvé.");
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de l'approbation", error);
    }
  };

  const openModal = (id) => {
    setUserToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  return (
    <div>
      <Nav /> {/* Nav component added at the top */}

      <div className="container">
        {/* CSS directement inclus */}
        <style>{`
          .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
            text-align: center;
            margin-bottom: 30px;
            color: #333333;
            font-size: 2rem;
            font-weight: bold;
          }

          .table {
            width: 100%;
            border-collapse: collapse;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
            background-color: #f9f9f9;
          }

          .table th,
          .table td {
            padding: 12px;
            text-align: center;
            border-bottom: 1px solid #ddd;
          }

          .table th {
            background-color: #4f86e4;
            color: white;
            font-size: 1.1rem;
            font-weight: bold;
          }

          .table tr:nth-child(even) {
            background-color: #e6f0ff;
          }

          .table tr:hover {
            background-color: #c6d9f7;
          }

          .button {
            padding: 8px 16px;
            margin: 5px;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 5px;
            transition: all 0.3s ease;
            font-weight: bold;
          }

          .button.approve {
            background-color: #4f86e4;
          }

          .button.deny {
            background-color: #f47c7c;
          }

          .button.delete {
            background-color: #f47c7c;
          }

          .button:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }

          /* Modal Styles */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: ${showModal ? "1" : "0"};
            visibility: ${showModal ? "visible" : "hidden"};
            transition: opacity 0.3s ease, visibility 0.3s ease;
          }

          .modal-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            width: 400px;
            text-align: center;
            transform: translateY(-50px);
            transition: transform 0.3s ease-in-out;
          }

          .modal-container.show {
            transform: translateY(0);
          }

          .modal-header {
            font-size: 1.5rem;
            margin-bottom: 20px;
            color: #333;
          }

          .modal-buttons {
            display: flex;
            justify-content: space-evenly;
          }

          .modal-button {
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.3s ease;
          }

          .modal-button.confirm {
            background-color: #4caf50;
            color: white;
          }

          .modal-button.cancel {
            background-color: #f44336;
            color: white;
          }

          .modal-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
        `}</style>

        <h1>Gestion des Utilisateurs</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Approuvé</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>
                  {user.approved ? (
                    <span style={{ color: "#4f86e4", fontWeight: "bold" }}>Oui</span>
                  ) : (
                    <span style={{ color: "#f47c7c", fontWeight: "bold" }}>Non</span>
                  )}
                </td>
                <td>
                  <button
                    className="button approve"
                    onClick={() =>
                      handleApprove(user._id, !user.approved)
                    }
                  >
                    {user.approved ? "Désapprouver" : "Approuver"}
                  </button>

                  <button
                    className="button delete"
                    onClick={() => openModal(user._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmation */}
      <div className="modal-overlay">
        <div className={`modal-container ${showModal ? "show" : ""}`}>
          <div className="modal-header">Êtes-vous sûr de vouloir supprimer cet utilisateur ?</div>
          <div className="modal-buttons">
            <button
              className="modal-button cancel"
              onClick={closeModal}
            >
              Annuler
            </button>
            <button
              className="modal-button confirm"
              onClick={() => {
                handleDelete(userToDelete);
                closeModal();
              }}
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
