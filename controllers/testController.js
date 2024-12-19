const TestModel = require("../models/Test.js");
const CertificateModel = require("../models/Certificate.js");
const mongoose = require('mongoose');
const UserModel = require("../models/user.model")
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
const submitTest = async (req, res) => {
  try {
    const { studentId, testId, answers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).send({ message: "ID utilisateur invalide." });
    }

    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).send({ message: "ID du test invalide." });
    }

    const test = await TestModel.findById(testId);
    if (!test) {
      return res.status(404).send({ message: "Test introuvable." });
    }

    let score = 0;

    test.questions.forEach((q, index) => {
      if (answers[index] && q.correctAnswer === answers[index]) {
        score += 1;
      }
    });

    const percentage = (score / test.questions.length) * 100;

    // Enregistrer le résultat dans le profil utilisateur
    const user = await UserModel.findById(studentId);
    if (!user) {
      return res.status(404).send({ message: "Utilisateur introuvable." });
    }

    user.testResults.push({
      testId,
      score,
      percentage,
      date: new Date(),
    });

    await user.save();

    res.status(200).send({
      message: "Test terminé et résultat enregistré.",
      score,
      percentage,
    });
  } catch (error) {
    console.error("Erreur lors de la soumission du test :", error);
    res.status(500).send({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};
const getUserScores = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findById(userId).select("testResults");
    if (!user) {
      return res.status(404).send({ message: "Utilisateur introuvable." });
    }

    res.status(200).send({
      testResults: user.testResults,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des scores :", error);
    res.status(500).send({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};
module.exports = { createTest, getAllTests ,  submitTest };

