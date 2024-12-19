import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import localImage from "../../assets/img/login.png";
import NavBar from "../../components/public/landing/navBar";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Validation des champs
  const validateInputs = () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse email valide.");
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.");
      return false;
    }
    setError(null); // Réinitialiser les erreurs
    return true;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        email,
        password,
      });

      console.log("Réponse du serveur :", response); // Log the response

      if (response.status === 201) {
        // Optionally store the token if returned
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        alert("Inscription réussie !");
        navigate("/"); // Redirection vers la page de connexion
      } else {
        console.error("Erreur lors de l'inscription :", response);
        setError("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      setError(err.response?.data?.message || "Erreur inattendue.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex bg-white rounded-lg shadow-xl overflow-hidden max-w-5xl w-full">
          {/* Formulaire */}
          <div className="w-1/2 p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Créer un{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                utilisateur
              </span>
            </h1>
            {error && (
              <p className="mb-4 text-red-500 text-sm font-semibold">{error}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  aria-label="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  required
                  aria-label="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg rounded-lg hover:opacity-90 transition"
              >
                S'inscrire
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-indigo-600 font-semibold"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </div>

          {/* Illustration */}
          <div className="w-1/2 bg-blue-50 dark:bg-gray-800 relative flex items-center justify-center">
            <img
              src={localImage}
              alt="Signup Illustration"
              className="max-w-full max-h-full rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-lg"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-40 blur-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
