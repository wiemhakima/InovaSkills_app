import { useState } from "react";
import Nav from "../../components/public/landing/nav";

const CreateCV = () => {
    const [cvData, setCvData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        jobTitle: "",
        summary: "",
        education: [],
        experience: [],
        skills: [],
    });

    const [isCvGenerated, setIsCvGenerated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCvData({ ...cvData, [name]: value });
    };

    const handleAddField = (field) => {
        const newEntry =
            field === "education"
                ? { degree: "", school: "", year: "" }
                : field === "experience"
                ? { title: "", company: "", duration: "" }
                : "";
        setCvData({
            ...cvData,
            [field]: [...cvData[field], newEntry],
        });
    };

    const handleRemoveField = (field, index) => {
        const updatedField = cvData[field].filter((_, i) => i !== index);
        setCvData({ ...cvData, [field]: updatedField });
    };

    const handleFieldChange = (field, index, subField, value) => {
        const updatedField = [...cvData[field]];
        updatedField[index][subField] = value;
        setCvData({ ...cvData, [field]: updatedField });
    };

    const handleGenerateCV = () => setIsCvGenerated(true);

    return (
        <div className="create-cv-page bg-gray-100 min-h-screen">
            <Nav />
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 max-w-4xl">
                <header className="border-b pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Créer un CV</h1>
                    <p className="text-gray-500">Remplissez le formulaire pour générer votre CV professionnel.</p>
                </header>

                {isCvGenerated ? (
                    <div className="cv-preview p-6 bg-gray-50 shadow-md rounded-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Votre CV</h2>
                        <div className="space-y-4">
                            {/* Informations personnelles */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-700">Informations personnelles</h3>
                                <p><strong>Nom :</strong> {cvData.firstName} {cvData.lastName}</p>
                                <p><strong>Email :</strong> {cvData.email}</p>
                                <p><strong>Téléphone :</strong> {cvData.phone}</p>
                                <p><strong>Poste :</strong> {cvData.jobTitle}</p>
                            </section>
                            {/* Ajouter d'autres sections comme l'éducation, l'expérience, etc. */}
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                            onClick={() => setIsCvGenerated(false)}
                        >
                            Modifier le CV
                        </button>
                    </div>
                ) : (
                    <form>
                        {/* Informations personnelles */}
                        <section className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                {["firstName", "lastName", "email", "phone", "jobTitle"].map((field) => (
                                    <input
                                        key={field}
                                        name={field}
                                        type={field === "email" ? "email" : "text"}
                                        value={cvData[field]}
                                        onChange={handleChange}
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                        className="w-full border rounded-md p-2"
                                        required
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Éducation */}
                        <section className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Éducation</h2>
                            {cvData.education.map((edu, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4 mt-3 items-center">
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        placeholder="Diplôme"
                                        onChange={(e) => handleFieldChange("education", index, "degree", e.target.value)}
                                        className="border rounded-md p-2"
                                    />
                                    <input
                                        type="text"
                                        value={edu.school}
                                        placeholder="École"
                                        onChange={(e) => handleFieldChange("education", index, "school", e.target.value)}
                                        className="border rounded-md p-2"
                                    />
                                    <input
                                        type="text"
                                        value={edu.year}
                                        placeholder="Année"
                                        onChange={(e) => handleFieldChange("education", index, "year", e.target.value)}
                                        className="border rounded-md p-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField("education", index)}
                                        className="text-red-500"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddField("education")}
                                className="mt-3 text-blue-500"
                            >
                                + Ajouter une formation
                            </button>
                        </section>

                        {/* Générer le CV */}
                        <button
                            type="button"
                            onClick={handleGenerateCV}
                            className="bg-green-500 text-white px-6 py-2 rounded-md mt-4 w-full"
                        >
                            Générer le CV
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateCV;
