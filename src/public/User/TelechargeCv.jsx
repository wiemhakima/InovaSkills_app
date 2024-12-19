import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/public/landing/nav";

const DownloadCVPage = () => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [userName, setUserName] = useState(userEmail ? userEmail.split("@")[0] : "Utilisateur");
  const [cvFile, setCvFile] = useState(null); // Etat pour gérer le fichier CV
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

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

  // Fonction pour gérer le changement de fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file);
    }
  };

  // Fonction pour ouvrir le fichier dans une nouvelle fenêtre (simule l'upload et l'ouverture du fichier)
  const handleFileUpload = () => {
    if (!cvFile) {
      alert("Veuillez sélectionner un fichier à télécharger.");
      return;
    }
    
    // Créer un objet URL pour le fichier sélectionné et ouvrir dans une nouvelle fenêtre
    const fileURL = URL.createObjectURL(cvFile);
    window.open(fileURL, "_blank"); // Ouvrir dans une nouvelle fenêtre (ou onglet)
    
    // Simuler l'upload en affichant un message de succès
    alert(`Le fichier ${cvFile.name} a été téléchargé avec succès.`);
    
    // Vous pouvez envoyer le fichier à votre serveur ici
  };

  return (
    <div className={`download-cv-page ${dark ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      <Nav />
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 max-w-4xl">
        <header className="flex items-center justify-between pb-6 border-b">
          <div className="flex items-center space-x-6">
            {/* Avatar et nom de l'utilisateur */}
            <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md">
              <span className="text-2xl font-bold">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userName}</h1>
              <p className="text-gray-500">{userEmail}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md shadow-md bg-red-500 text-white hover:bg-red-600"
            >
              Déconnexion
            </button>
          </div>
        </header>

        <section className="mt-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">Télécharger mon CV</h2>
            <p className="mt-2">Veuillez choisir votre fichier CV ci-dessous.</p>

            {/* Formulaire d'upload de fichier */}
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={handleFileChange}
              className="mt-4"
            />

            <div className="mt-4">
              {cvFile && (
                <p>Fichier sélectionné : {cvFile.name}</p>
              )}
            </div>

            <button
              onClick={handleFileUpload}
              className="mt-4 px-4 py-2 rounded-md shadow-md bg-green-500 text-white hover:bg-green-600"
            >
              Ouvrir
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">À propos de moi</h2>
            <p className="mt-2">
              Bienvenue, <strong>{userName}</strong>! Vous pouvez gérer votre compte depuis cette page.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DownloadCVPage;
