// src/components/CardModal.js
import React from 'react';
import './css/CardModal.css';

const cardTypes = [
  { name: 'Feu', icon: '/images/feu.png' },
  { name: 'Eau', icon: '/images/eau.png' },
  { name: 'Plante', icon: '/images/plante.png' },
  { name: 'Électrique', icon: '/images/foudre.png' },
  { name: 'Psy', icon: '/images/obscure.png' },
  { name: 'Combat', icon: '/images/combat.png' },
  { name: 'Full Art ÉlectriqueFAI', icon: '/images/FoudreFAI.png' },
  { name: 'Full Art FeuFAI', icon: '/images/FeuFAI.png' },
  { name: 'Full Art EauFAI', icon: '/images/EauFAI.png' },
  { name: 'Full Art PlanteFAI', icon: '/images/PlanteFAI.png' },
  { name: 'Full Art CombatFAI', icon: '/images/CombatFAI.png' },
  { name: 'Full Art ObscureFAI', icon: '/images/ObscureFAI.png' },
];

const energyTypes = [
  { name: 'Feu-Energie', icon: '/images/feu-energie.png' },
  { name: 'Eau-Energie', icon: '/images/eau-energie.png' },
  { name: 'Foudre-Energie', icon: '/images/foudre-energie.png' },
  { name: 'Plante-Energie', icon: '/images/plante-energie' },
  { name: 'Combat-Energie', icon: '/images/combat-energie' },
  { name: 'Obscure-Energie', icon: '/images/obscure-energie.png' },
  { name: 'Psy-Energie', icon: '/images/psy-energie.png' },
];

const MAX_ENERGY_UNITS = 4;

const CardModal = ({ cardData, setCardData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e) => {
    const selectedType = cardTypes.find((type) => type.name === e.target.value);
    setCardData((prev) => ({ ...prev, type: selectedType }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setCardData((prev) => ({ ...prev, image: null }));
  };

  const handleAttackChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      attack: { ...prev.attack, [name]: value },
    }));
  };

  const handleEnergyTypeChange = (index, type) => {
    setCardData((prev) => {
      const updatedEnergyTypes = [...(prev.attack?.energyTypes || [])];
      updatedEnergyTypes[index] = { type, quantity: updatedEnergyTypes[index]?.quantity || 0 };
      return {
        ...prev,
        attack: { ...prev.attack, energyTypes: updatedEnergyTypes },
      };
    });
  };

  const handleEnergyUnitsChange = (index, units) => {
    const totalUnits = cardData.attack.energyTypes?.reduce((acc, energy) => acc + (energy.quantity || 0), 0) || 0;
    const otherUnits = totalUnits - (cardData.attack.energyTypes?.[index]?.quantity || 0);

    const newUnits = Math.min(units, MAX_ENERGY_UNITS - otherUnits);

    setCardData((prev) => {
      const updatedUnits = [...(prev.attack?.energyTypes || [])];
      updatedUnits[index] = { ...updatedUnits[index], quantity: newUnits };
      return {
        ...prev,
        attack: { ...prev.attack, energyTypes: updatedUnits },
      };
    });
  };

  return (
    <div className="card-modal">
      <h2 className="modal-title">Éditeur de carte</h2>

      <div className="modal-section">
        <label>Nom de la carte:</label>
        <input
          type="text"
          name="name"
          value={cardData.name || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="modal-section">
        <label>Type de carte:</label>
        <select
          value={cardData.type?.name || ''}
          onChange={handleTypeChange}
        >
          <option value="">Sélectionnez un type</option>
          {cardTypes.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="modal-section">
        <label>PV:</label>
        <input
          type="number"
          name="hp"
          value={cardData.hp || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="modal-section">
        <label>Image de la carte:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {cardData.image && (
          <button className="remove-image-button" onClick={handleRemoveImage}>
            Retirer l’image
          </button>
        )}
      </div>

      <div className="modal-section">
        <label>Taille (cm):</label>
        <input
          type="text"
          name="height"
          value={cardData.height || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="modal-section">
        <label>Poids (kg):</label>
        <input
          type="text"
          name="weight"
          value={cardData.weight || ''}
          onChange={handleInputChange}
        />
      </div>

      {/* Section d'attaque */}
      <div className="modal-section attack-section">
        <h3>Attaque</h3>
        <label>Nom de l'attaque n:</label>
        <input
          type="text"
          name="name"
          value={cardData.attack?.name || ''}
          onChange={handleAttackChange}
        />
        <label>Dégâts:</label>
        <input
          type="number"
          name="damage"
          value={cardData.attack?.damage || ''}
          onChange={handleAttackChange}
          max="999"
        />
        <div className='info-attack-modal'>
          <label>Informations de l'attaque:</label>
          <textarea
            name="info"
            value={cardData.attack?.info || ''}
            onChange={handleAttackChange}
          />
        </div>
        <div>
          <label>Type et quantité d'énergie :</label>
          {[0, 1].map((index) => (
            <div key={index}>
              <select
                value={cardData.attack?.energyTypes?.[index]?.type || ''}
                onChange={(e) => handleEnergyTypeChange(index, e.target.value)}
              >
                <option value="">Choisissez un type d'énergie</option>
                {energyTypes.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
              <select
                value={cardData.attack?.energyTypes?.[index]?.quantity || 0}
                onChange={(e) => handleEnergyUnitsChange(index, Number(e.target.value))}
              >
                {[0, 1, 2, 3, 4].map((quantity) => (
                  <option key={quantity} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default CardModal;
