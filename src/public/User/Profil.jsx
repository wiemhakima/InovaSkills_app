import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/public/landing/nav";

const ProfilePage = () => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [userRole, setUserRole] = useState(localStorage.getItem("Role"));
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  const userName = userEmail ? userEmail.split("@")[0] : "Utilisateur";

  // Vérification du token pour déterminer si l'utilisateur est un admin
  const token = localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const decodeToken = JSON.parse(atob(token.split(".")[1])); // Décoder le token JWT
      setIsAdmin(decodeToken?.role === "admin"); // Vérifier si le rôle est "admin"
    }
  }, [token]);

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

  // Extraire la première lettre de l'email pour l'avatar
  const avatarInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "";

  return (
    <div className={`profile-page ${dark ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      <Nav />
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 max-w-4xl">
        <header className="flex items-center justify-between pb-6 border-b">
          <div className="flex items-center space-x-6">
            {/* Avatar basé sur la première lettre de l'email */}
            <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md">
              <span className="text-2xl font-bold">{avatarInitial}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userName}</h1>
              <p className="text-gray-500">{userEmail}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            {/* Si l'utilisateur est un "user" */}
            {!isAdmin && (
              <>
                <button
                  onClick={() => navigate("/user/CreateCV")}
                  className="px-4 py-2 rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600"
                >
                  Créer un CV
                </button>
                <button
                  onClick={() => navigate("user/TelechargeCv")}
                  className="px-4 py-2 rounded-md shadow-md bg-green-500 text-white hover:bg-green-600"
                >
                  Télécharger mon CV
                </button>
              </>
            )}

            {/* Si l'utilisateur est un "admin" */}
            {isAdmin && (
              <>
                <button
                  onClick={() => navigate("/userManagement")}
                  className="px-4 py-2 rounded-md shadow-md bg-purple-500 text-white hover:bg-purple-600"
                >
                  Gestion des utilisateurs
                </button>
              </>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md shadow-md bg-red-500 text-white hover:bg-red-600"
            >
              Déconnexion
            </button>
          </div>
        </header>

        {!isAdmin && (
          <>
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">À propos de moi</h2>
            <p className="mt-2">
              Bienvenue, <strong>{userName}</strong>! Vous pouvez gérer votre compte depuis cette page.
            </p>
          </div>
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h2 className="text-xl font-semibold">Créer et Télécharger mon CV</h2>
              <p className="mt-2">
                Vous pouvez créer ou télécharger votre CV en utilisant les options ci-dessus.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h2 className="text-xl font-semibold">Mes Compétences et Progrès</h2>
              <p className="mt-2">Suivez vos compétences, scores, et certifications ici.</p>
            </div>
          </>
        )}

        {/* Section visible uniquement pour les administrateurs "admin" */}
        {isAdmin && (
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">Gestion Admin</h2>
            <p className="mt-2">En tant qu'administrateur, vous pouvez gérer les utilisateurs, surveiller leurs performances, et plus encore.</p>
          </div>
           )}
        
     
      </div>
    </div>
  );
};

export default ProfilePage;
