const CertificateModel = require("../models/Certificate.js");
const QuizModel = require("../models/Quiz.js");
const generate  = async (req, res) => {
  const { id } = req.params;

  try {
    const certificate = await CertificateModel.findById(id);
    if (certificate) {
      return res.status(200).json(certificate);
    } else {
      return res.status(404).json({ message: "Certificat non trouvé" });
    }
  } catch (error) {
    console.error("Erreur : ", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
//   async (req, res) => {
//   try {
//     const certificate = await CertificateModel.findById(req.params.id);
//     if (!certificate) return res.status(404).send({ message: "Certificat introuvable." });
//     res.status(200).send(certificate);
//   } catch (error) {
//     res.status(500).send({ message: "Erreur serveur.", error });
//   }
// };



module.exports = {generate };
