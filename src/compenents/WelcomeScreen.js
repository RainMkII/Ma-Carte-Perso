// src/components/WelcomeScreen.js
import React from 'react';
import './css/welcome.css'


const WelcomeScreen = ({ onStart }) => {
  return (
    <div>
      <div className='Welcome-index' >
        <h1>Bienvenue sur l'éditeur de cartes personnalisées</h1>
        <button onClick={onStart}>Commencer la création de carte</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;