import { useState, useEffect } from "react";
import Nav from "../../components/public/landing/nav"; // Importation de la barre de navigation

const Score = () => {
    const [skills, setSkills] = useState([
        { id: 1, name: "Compétence 1", score: 0 },
        { id: 2, name: "Compétence 2", score: 0 },
        { id: 3, name: "Compétence 3", score: 0 },
    ]);
    
    const [totalScore, setTotalScore] = useState(0); // Total des scores des compétences

    useEffect(() => {
        // Calculer le score total basé sur les compétences
        const total = skills.reduce((acc, skill) => acc + skill.score, 0);
        setTotalScore(total);
    }, [skills]); // Recalculer le total chaque fois que les scores des compétences changent

    const handleScoreChange = (id, newScore) => {
        // Mettre à jour le score d'une compétence spécifique
        const updatedSkills = skills.map(skill => 
            skill.id === id ? { ...skill, score: newScore } : skill
        );
        setSkills(updatedSkills);
    };

    const renderStars = (score) => {
        const maxStars = 5;
        const filledStars = Math.round((score / 100) * maxStars); // Calcul des étoiles pleines
        return (
            <div className="flex">
                {[...Array(maxStars)].map((_, index) => (
                    <span key={index} className={`text-xl ${index < filledStars ? "text-yellow-500" : "text-gray-300"}`}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="score-page bg-gray-100 min-h-screen">
            <Nav />
            <div className="score-container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 max-w-3xl">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Page des Scores</h1>
                    <p className="text-gray-500">Voici vos scores pour chaque compétence.</p>
                </header>

                <section>
                    {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center justify-between py-4 border-b">
                            <div className="text-xl font-semibold text-gray-800">{skill.name}</div>
                            <div className="flex items-center space-x-3">
                                {renderStars(skill.score)}
                                <input
                                    type="number"
                                    value={skill.score}
                                    min="0"
                                    max="100"
                                    className="w-16 p-2 border rounded-md text-center"
                                    onChange={(e) => handleScoreChange(skill.id, parseInt(e.target.value) || 0)}
                                />
                                <span className="text-lg font-medium">{skill.score} / 100</span>
                            </div>
                        </div>
                    ))}
                </section>

                <footer className="mt-6 text-center">
                    <div className="text-xl font-semibold text-gray-800">
                        <strong>Total des scores :</strong> {totalScore} / {skills.length * 100}
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Score;
