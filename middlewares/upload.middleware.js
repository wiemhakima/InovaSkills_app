const multer = require('multer');
const path = require('path');

// Configuration de l'emplacement et du nom des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier où stocker les fichiers (à créer dans votre projet)
  },
  filename: function (req, file, cb) {
    // Nomme le fichier avec une date et son nom d'origine
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtrage pour accepter uniquement certains types de fichiers
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers PDF et images sont autorisés'), false);
  }
};

// Middleware d'upload
const upload = multer({ storage, fileFilter });

module.exports = upload;
