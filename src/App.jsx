import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './public/landing';
import Login from './public/Login/Login';
import Signup from './public/Login/Signup';
import Profil from './public/User/Profil';
import Score from './public/User/Score';
import CreateCV from './public/User/CreateCV';
import Design from './public/Cours.jsx/design';
import Php from './public/Cours.jsx/php';
import ReactCourse from './public/Cours.jsx/react';
import Flutter from './public/Cours.jsx/flutter';
import Python from './public/Cours.jsx/python';
import GestionCours from './public/Admin/Gestion/GestionCours';
import Certificate from './certificate';
import GestionQuiz from './public/Admin/Gestion/GestionQuiz';
import PrivateRoute from "./PrivateRoute";
import Unauthorized from './public/Admin/Mangement/Unauthorized'; 
import UserManagement from './public/Admin/Mangement/usermanagement';
import GestionAll from './public/Admin/Gestion/GestionAll';
import Quiz from './public/Quiz/quiz';
import Test from './public/Tests/Test';
import TelechargeCv from './public/User/TelechargeCv';
import FeedbackForm from './public/FeedBacks/FeedbackForm';
import FeedbackList from './public/FeedBacks/Feedbacklist';
import GestionTest from './public/Admin/Gestion/GestionTests';
import Propos from './public/Propos';
import Ressources from'./public/Ressources';
function App() {
  return (
    <Router>
      <Routes>
        {/* Routes principales */}
        <Route path="/" element={<Login />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="user/Score" element={<Score />} />
        <Route path="user/CreateCV" element={<CreateCV />} />
        <Route path="profil/user/TelechargeCv" element={<TelechargeCv />} />
        <Route path="/certificate/:id" element={<Certificate />} />


        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/feedbacks" element={<FeedbackList />} />
        {/* Routes pour les pages de cours */}

        <Route path="/cours/design" element={<Design />} />
        <Route path="/cours/php" element={<Php />} />
        <Route path="/cours/react" element={<ReactCourse />} />
        <Route path="/cours/flutter" element={<Flutter />} />
        <Route path="/cours/python" element={<Python />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/quiz" element={<Quiz />} />

       
        {/* Admin  */}
        <Route path="/GestionAll" element={<GestionAll />}/>
        <Route path="/cours" element={<GestionCours />} />
        
        <Route path="/GestionQuiz" element={<GestionQuiz />} />
        <Route path="/GestionTest" element={<GestionTest />} />

        <Route
          path="/usermanagement"
          element={
            <PrivateRoute>
              <UserManagement />
            </PrivateRoute>
          }
        />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/Propos" element={<Propos />} />
      <Route path="/ressources" element={<Ressources />} />

      

      </Routes>
    </Router>
  );
}

export default App;
