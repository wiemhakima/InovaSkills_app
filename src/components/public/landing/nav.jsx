import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon, ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"; // Importer ShoppingCartIcon
import log from "../../../assets/img/log.svg";

const Nav = () => {
  const [dark, setDark] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [Role, setUserRole] = useState(localStorage.getItem("Role"));
  const userName = userEmail ? userEmail.split("@")[0] : "Utilisateur";

  // Vérification du token et du rôle
  const token = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    const decodeToken = JSON.parse(atob(token.split(".")[1])); // Décoder le token JWT
    console.log(decodeToken); // Ajout de console.log pour vérifier le contenu du token
    isAdmin = decodeToken?.role === "admin"; // Vérifier si le rôle est "admin"
  }

  useEffect(() => {
    if (!userEmail) {
      navigate("/"); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [userEmail, navigate]);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token"); // Supprimer le token lors de la déconnexion
    navigate("/"); // Rediriger vers la page de connexion après déconnexion
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 shadow-md bg-white dark:bg-gray-900 duration-500">
      <nav className="flex w-full max-w-[85rem] mx-auto items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src={log} alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            Innova
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Skills
            </span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <a
            href="/Landing"
            className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Accueil
          </a>
          <a
            href="/profil"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Profile
          </a>

          {!isAdmin && (
            <>
              <a
                href="/Test"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
                Tests
              </a>
              <a
                href="/quiz"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
                Certificats
              </a>
              <a 
                href="/feedback"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
              Commentaires
              </a>
              <a
                href="/usermanagement"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
                Gestion des utilisateurs
              </a>
            </>
          )}

          {isAdmin && (
            <>
              <a
                href="/usermanagement"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
                Gestion des Utilisateurs
              </a>
              <a
                href="/GestionAll"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
                Gestion des composants
              </a>
              <a 
                href="/feedbacks"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
                Liste des commentaires
              </a>
            </>
          )}
        </div>

        {/* Profile, Dark Mode, and Cart Section */}
        <div className="relative flex items-center gap-4">
          <button className="text-gray-800 dark:text-gray-300 hover:text-blue-500">
            <ShoppingCartIcon className="h-6 w-6" /> {/* Logo Panier */}
          </button>
          <button onClick={darkModeHandler} className="text-gray-800 dark:text-gray-300 hover:text-blue-500">
            {dark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </button>

          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold uppercase">
                {userName.charAt(0)}
              </div>
              <span className="text-gray-800 dark:text-gray-300 font-medium">{userName}</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-600 dark:text-white" />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20">
                <a
                  href="/score"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Score
                </a>
                <a
                  href="/Settings"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Paramètres
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
