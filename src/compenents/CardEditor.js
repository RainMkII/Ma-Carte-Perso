// src/components/CardEditor.js
import React, { useState } from 'react';
import CardModal from './CardModal';
import CardPreview from './CardPreview';

const CardEditor = () => {
  const [cardData, setCardData] = useState({
    name: "",
    type: "",
    hp: "",
    image: "",
    weight:"",
    height:"",
    
    //...ajoute d’autres champs ici selon les besoins
  });

  return (
    <div style={{ display: 'flex', padding: '20px', alignItems: 'center', justifyContent: 'center', gap: '260px', marginTop: '70px' }}>
      <CardModal cardData={cardData} setCardData={setCardData} />
      <CardPreview cardData={cardData} />
    </div>
  );
};

export default CardEditor;