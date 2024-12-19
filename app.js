const express = require("express");
const mongoose = require("./mongo");  // Assurez-vous que la connexion MongoDB est bien établie
const cors = require("cors");
const multipart = require('connect-multiparty');
const uploadMiddleware = multipart({ uploadDir: './uploads' });
const certificateController = require("./controllers/certificate.controller.js");
const quizController = require("./controllers/quiz.controller.js");
const testController = require('./controllers/testController.js');
const skillsController = require("./controllers/skills.controller");
const userController = require("./controllers/user.controller");
const authController = require('./controllers/auth.controller');
const { authMiddleware } = require('./middlewares/auth');
const FeedbackController =require('./controllers/FeedbackController.js');

const app = express();
app.use(express.json());
app.use(cors());

// Route GET pour la page d'accueil
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API !");
});

// Routes pour les compétences
app.get("/skills", skillsController.getAll);
app.post("/skills", skillsController.telecharger.single('file'), skillsController.create);

app.put('/skills/:id', authMiddleware, skillsController.telecharger.single('file'), skillsController.update);
app.delete("/skills/:id", skillsController.remove);


// Routes utilisateurs
app.get('/users', userController.getAll);
app.post('/create_user', uploadMiddleware, userController.create);
app.put('/users/:id', [authMiddleware, uploadMiddleware],userController.update);
app.delete('/users/:id',userController.remove);
app.put('/users/:id', userController.approveUser);

// Routes authentification
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);

app.get("/certificate/:id",certificateController.generate);
app.get("/quiz", quizController.getAll);
app.post("/quizzes", quizController.createQuiz);
app.post("/quiz/submit", quizController.submitQuiz);

//onlyy admin can access this router

// Route pour les test
app.post('/create_test', testController.createTest);

app.get('/tests', testController.getAllTests);

app.post('/submit_test',testController.submitTest);


//all can aaccess 
const path = require('path');

// Configuration pour servir les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//feeddbacks
app.post('/feedback',FeedbackController.addfeedback);

app.get('/feedbacks',FeedbackController.getfeedbacks)
app.delete('/feedback/:id', FeedbackController.removefeedback);


// Middleware de gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error("Erreur:", err);
    if (err.response) {
        res.status(err.response.status || 500).json({
            message: err.response.data?.message || "Erreur serveur. Veuillez réessayer plus tard."
        });
    } else {
        res.status(500).json({
            message: "Erreur interne du serveur. Veuillez réessayer plus tard."
        });
    }
});


// const formData = new FormData();
// formData.append('name', 'React');
// formData.append('description', 'Framework JavaScript');
// formData.append('file', selectedFile);

// fetch('/skills', {
//   method: 'POST',
//   body: formData,
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Erreur:', error));


// Démarrage du serveur
app.listen(8000, () => {
    console.log(`🚀 Serveur démarré sur le port 8000`);
});