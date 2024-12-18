const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // Charge les variables d'environnement depuis .env

// Fonction d'inscription
const register = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
      return res.status(400).send({ message: 'Email et mot de passe sont requis' });
  }

  try {
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
          return res.status(400).send({ message: 'Utilisateur déjà existant' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
          email,
          password: hashedPassword,
          role,
          approved: role === 'admin' ? true : false,  // Mark as approved if role is admin
      });

      await newUser.save();

      // Si l'utilisateur est un admin, pas besoin d'attendre l'approbation
      const message = role === 'admin' 
          ? 'Compte créé avec succès. Bienvenue, administrateur.' 
          : 'Compte créé, en attente d\'approbation par l\'administrateur';

      res.status(201).send({ message });
  } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Erreur interne du serveur', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).send({ message: 'Email et mot de passe requis' });
  }

  try {
      const user = await UserModel.findOne({ email });

      if (!user) {
          return res.status(401).send({ message: 'Identifiants invalides' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(401).send({ message: 'Mot de passe incorrect' });
      }

      // Si l'utilisateur est un admin, on le connecte directement
      if (user.role === 'admin') {
          const token = jwt.sign(
              { _id: user._id, email: user.email, role: user.role },
              process.env.SECRET,
              { expiresIn: '1h' }
          );

          return res.status(200).send({ token, user });
      }

      // Vérification de l'approbation pour les utilisateurs normaux
      if (!user.approved) {
          return res.status(403).send({ message: 'Compte cree ! ' });
      }

      const token = jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          process.env.SECRET,
          { expiresIn: '1h' }
      );

      res.status(200).send({ token, user });
  } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Erreur interne du serveur', error: err.message });
  }
};

  
module.exports = {login, register} ;