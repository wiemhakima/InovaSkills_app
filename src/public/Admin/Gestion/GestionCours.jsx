import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from '..//../../components/public/landing/nav';

function GestionCours() {
  const [skills, setSkills] = useState([]); // Liste des compétences
  const [newSkill, setNewSkill] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [editSkill, setEditSkill] = useState(null); // État pour l'édition

  // Récupérer la liste des compétences
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/skills");
      setSkills(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des compétences.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Fonction pour ajouter une nouvelle compétence
  const handleAddSkill = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newSkill);
    formData.append("description", newDescription);
    if (newFile) formData.append("file", newFile);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/skills",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSkills([...skills, response.data]);
      setNewSkill("");
      setNewDescription("");
      setNewFile(null);
      setLoading(false);
    } catch (err) {
      console.error("Erreur", err);
      setError("Erreur lors de l'ajout de la compétence.");
      setLoading(false);
    }
  };

  // Fonction pour supprimer une compétence
  const handleDeleteSkill = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/skills/${id}`);
      setSkills(skills.filter((skill) => skill._id !== id));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression de la compétence.");
      setLoading(false);
    }
  };

  // Fonction pour soumettre la mise à jour de la compétence
  const handleUpdateSkill = async (e) => {
    e.preventDefault();
    
    if (!editSkill._id) {
      console.error("L'ID de la compétence est introuvable.");
      setError("ID de la compétence incorrecte.");
      return;
    }
  
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append("name", editSkill.name);
    formData.append("description", editSkill.description);
    if (editSkill.file) formData.append("file", editSkill.file);
  
    setLoading(true);
  
    try {
      const response = await axios.put(
        `http://localhost:8000/skills/${editSkill._id}`,
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
  
      console.log("Réponse serveur :", response);
      fetchSkills();
      setEditSkill(null);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      setError("Erreur lors de la mise à jour.");
      setLoading(false);
    }
  };

  return (
    <>
    <Nav />

    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Gestion des Cours</h1>

      {error && (
        <div className="text-red-600 bg-red-100 p-4 rounded-lg mb-6 shadow-md">
          <strong>Erreur : </strong> {error}
        </div>
      )}

      {/* Formulaire pour ajouter une nouvelle compétence */}
      <form
        onSubmit={handleAddSkill}
        className="flex flex-col md:flex-row md:space-x-4 bg-white p-4 rounded-lg shadow-lg mb-8"
      >
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Nom de la Cour"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 md:mb-0"
        />
        <input
          type="file"
          onChange={(e) => setNewFile(e.target.files[0])}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 md:mb-0"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Ajouter
        </button>
      </form>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Liste des compétences</h2>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li key={skill._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
            <div>
              <p className="text-lg font-medium">Nom : {skill.name}</p>
              <p className="text-sm text-gray-600">Description : {skill.description}</p>
              <p className="text-sm text-gray-600">Fichier : {skill.file || "Aucun fichier"}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditSkill({ ...skill })}
                className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDeleteSkill(skill._id)}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editSkill && (
        <form onSubmit={handleUpdateSkill} className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Modifier la compétence</h3>
          <input
            type="text"
            value={editSkill.name}
            onChange={(e) => setEditSkill({ ...editSkill, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-2"
          />
          <input
            type="text"
            value={editSkill.description}
            onChange={(e) => setEditSkill({ ...editSkill, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-2"
          />
          <input
            type="file"
            onChange={(e) => setEditSkill({ ...editSkill, file: e.target.files[0] })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-2"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Mettre à jour
            </button>
            <button
              type="button"
              onClick={() => setEditSkill(null)}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
    </>
  );
}

export default GestionCours;
