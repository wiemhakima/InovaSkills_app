const TestModel = require("../models/Test.js");
const CertificateModel = require("../models/Certificate.js");
const mongoose = require('mongoose');

// Créer un test
const createTest = async (req, res) => {
  try {
    const { title, passingScore, questions } = req.body;

    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).send({
        message: "Titre du test et questions sont obligatoires.",
      });
    }

    const isValidQuestions = questions.every(
      (q) =>
        q.question &&
        Array.isArray(q.options) &&
        q.options.length >= 2 &&
        q.correctAnswer
    );

    if (!isValidQuestions) {
      return res.status(400).send({
        message: "Chaque question doit avoir un titre, au moins deux options et une réponse correcte.",
      });
    }

    const newTest = new TestModel({
      title,
      passingScore: passingScore || 70,
      questions,
    });

    const savedTest = await newTest.save();

    res.status(201).send({
      message: "Test créé avec succès.",
      test: savedTest,
    });
  } catch (error) {
    console.error("Erreur lors de la création du test :", error);
    res.status(500).send({
      message: "Erreur serveur lors de la création du test.",
      error: error.message,
    });
  }
};

// Récupérer tous les tests
const getAllTests = async (req, res) => {
  try {
    const tests = await TestModel.find();
    res.status(200).send(tests);
  } catch (error) {
    console.error("Erreur lors de la récupération des tests :", error);
    res.status(500).send({
      message: "Erreur lors de la récupération des tests.",
      error: error.message,
    });
  }
};

// Soumettre un test
// const submitTest =async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: "Utilisateur non authentifié" });
//     }

//     const { testId, answers } = req.body;

//     // Validation basique des données reçues
//     if (!testId || !answers) {
//       return res.status(400).json({ message: "Test ID ou réponses manquantes" });
//     }

//     console.log(`ID Utilisateur: ${req.user._id}, Test: ${testId}, Réponses:`, answers);

//     // Sauvegarder les résultats (exemple simplifié)
//     const result = {
//       testId,
//       userId: req.user._id,
//       score: 80, // Exemple de score simulé
//       percentage: 80, // Exemple de pourcentage
//     };

//     return res.status(200).json({ message: "Test soumis avec succès", result });
//   } catch (err) {
//     console.error("Erreur lors de la soumission du test :", err.message);
//     res.status(500).json({ message: "Erreur interne du serveur" });
//   }
// };
module.exports = { createTest, getAllTests };

