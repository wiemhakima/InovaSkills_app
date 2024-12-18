import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'preline/preline'
import Aos from 'aos'

import Modal from "react-modal";

// Définit l'élément racine pour React Modal
Modal.setAppElement("#root");

Aos.init();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
