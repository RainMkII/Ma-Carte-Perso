// src/App.js
import React, { useState } from 'react';
import WelcomeScreen from './compenents/WelcomeScreen';
import CardEditor from './compenents/CardEditor';
import './compenents/css/background-app.css';

function App() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="background">
      {isEditing ? (
        <CardEditor />
      ) : (
        <WelcomeScreen onStart={() => setIsEditing(true)} />
      )}
    </div>
  );
}

export default App;