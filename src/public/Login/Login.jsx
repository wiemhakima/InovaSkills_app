import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import localImage from "../../assets/img/login.png";
import NavBar from "../../components/public/landing/navBar";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const validateInputs = () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return false;
    }
    setError(null);
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      console.log("Données envoyées :", { email, password });

      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      console.log("Réponse API :", response);

      if (response.status === 200) {
        const { token, user } = response.data;

        if (token) {
          // Stockage du token dans localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("userEmail", user.email); // Enregistrer l'email dans localStorage

          // Configurer Axios pour envoyer le token avec chaque requête
          axios.defaults.headers['Authorization'] = `Bearer ${token}`;


          // Rediriger vers la page de profil ou tableau de bord après la connexion
          navigate("/Landing", { state: { id: user.email } });
        } else {
          alert("Réponse inattendue du serveur");
        }
      } else {
        setError("Erreur lors de la connexion. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Informations incorrectes");
      console.error("Erreur lors de la connexion :", error);

      if (error.response) {
        setError(error.response.data?.message || "Erreur serveur. Veuillez réessayer plus tard.");
      } else {
        setError("Problème de connexion au serveur. Vérifiez votre connexion Internet.");
      }
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
              Bienvenue chez{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                Innovaskils
              </span>
            </h1>
            {error && (
              <p className="mb-4 text-red-500 text-sm font-semibold">
                {error}
              </p>
            )}
            <form onSubmit={submit}>
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
                Se connecter
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Vous n'avez pas de compte ?{" "}
                <Link
                  to="/Signup"
                  className="text-blue-500 hover:text-indigo-600 font-semibold"
                >
                  S’inscrire
                </Link>
              </p>
            </div>
          </div>

          {/* Illustration */}
          <div className="w-1/2 bg-blue-50 dark:bg-gray-800 relative flex items-center justify-center">
            <img
              src={localImage}
              alt="Login Illustration"
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

export default Login;