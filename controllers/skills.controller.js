
// Configuration de multer pour le stockage du fichier

const multer = require('multer');
const path = require('path');
const SkillModel = require('../models/skills.model');

const upload = multer({ storage: multer.memoryStorage() });
// Configuration du stockage Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Chemin vers le répertoire d'upload
  },
  filename: function (req, file, cb) {
    // Créer un nom de fichier unique avec la date + extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Définir les types MIME autorisés
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'application/pdf',
];

// Configuration de la logique de filtrage
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé'), false);
  }
};

// Création de l'instance Multer avec stockage et validation
const telecharger = multer({
  storage,
  fileFilter,
});

const getAll = async (req, res) => {
  try {
    const data = await SkillModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      error: "Erreur lors de la récupération des compétences",
      details: err.message,
    });
  }
};

const create = async (req, res) => {
  const { name, description } = req.body;
  const file = req.file ? req.file.path : null;

  const skill = new SkillModel({
    name,
    description,
    file,
  });

  try {
    const savedSkill = await skill.save();
    res.status(201).send(savedSkill);
  } catch (err) {
    res.status(400).send({
      error: "Erreur lors de la création de la compétence",
      details: err.message,
    });
  }
};



// Mettre à jour une compétence existante
const update = async (req, res) => {
  try {
    console.log('Body reçus :', req.body);
    console.log('File reçue :', req.file);

    const updatedSkill = await SkillModel.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name,
        description: req.body.description,
        file: req.file ? req.file.buffer : null,
      }
    );

    if (updatedSkill.modifiedCount > 0) {
      return res.status(200).send({ message: 'Compétence mise à jour avec succès' });
    }

    return res.status(404).send({ error: 'Compétence non trouvée ou aucune modification' });
  } catch (err) {
    return res.status(500).send({
      error: 'Erreur lors de la mise à jour',
      details: err.message,
    });
  }
};
// Supprimer une compétence
const remove = async (req, res) => {
  try {
    const result = await SkillModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(200).send({ message: "Compétence supprimée avec succès" });
    } else {
      res.status(404).send({ error: "Compétence non trouvée" });
    }
  } catch (err) {
    console.error("Erreur lors de la suppression de la compétence:", err);
    res.status(400).send({
      error: "Erreur lors de la suppression de la compétence",
      details: err.message,
    });
  }
};

module.exports = { getAll, create, update, remove ,telecharger};