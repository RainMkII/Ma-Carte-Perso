import React, { useRef, useState } from 'react';
import './css/CardPreview.css';
import foudreIcon from './images/foudre.png';
import html2canvas from 'html2canvas';

const CardPreview = ({ cardData }) => {
  const cardRef = useRef(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const [rotation, setRotation] = useState({ x: 0, y: 0 }); // État pour la rotation 3D

  const handleMouseDown = (e) => {
    setDragging(true);
    startPos.current = { x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y };
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setImagePosition({
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y,
      });
    } else {
      const { offsetWidth: width, offsetHeight: height } = e.currentTarget;
      const { offsetX: x, offsetY: y } = e.nativeEvent;

      const rotateX = ((y / height) - 0.5) * -20;
      const rotateY = ((x / width) - 0.5) * 20;

      setRotation({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseUp = () => setDragging(false);

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 }); // Réinitialisation de la rotation
  };

  const handleWheel = (e) => {
    e.preventDefault();
    setImageScale((prev) => Math.min(Math.max(0.5, prev - e.deltaY * 0.001), 2));
  };

  const downloadCardAsImage = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
      });
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'carte-personnalisee.png';
      link.click();
    }
  };

  const typeImageSrc = cardData.type?.icon || foudreIcon;
  const isFullArt = cardData.type?.name?.includes('Full Art');

  return (
    <div className="card-container">
      <div
        className={`card-preview ${isFullArt ? 'full-art' : ''}`}
        ref={cardRef}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
        {isFullArt && (
          <div
            className="background-image full-art-background"
            style={{
              backgroundImage: `url(${cardData.type.icon})`,
              backgroundSize: 'cover',
              zIndex: '1'
            }}
          ></div>
        )}

        {cardData.image && (
          <img
            src={cardData.image}
            alt="carte personnalisée"
            className="user-image"
            style={{
              transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`
            }}
          />
        )}

        <div className="card-info-container">
          <div className={`card-name ${isFullArt ? 'full-art-name' : ''}`}>
            <div className="card-name-text">{cardData.name}</div>
          </div>
          <div className={`card-header ${isFullArt ? 'full-art-header' : ''}`}>
            <div className="card-hp">{cardData.hp}</div>
            <div className={`card-pv ${isFullArt ? 'full-art-name' : ''}`}>PV</div>
          </div>
        </div>

        {!isFullArt && (
          <div className="card-image">
            <img src={typeImageSrc} alt="Type de carte" className="type-image" />
          </div>
        )}

        {!isFullArt && (
          <div className="card-type">Type: {cardData.type?.name}</div>
        )}
        {!isFullArt && (
          <div className="card-size">
            Taille: {cardData.height || 'N/A'} | Poids: {cardData.weight || 'N/A'}
          </div>
        )}

        {/* Section des attaques */}
        {cardData.attack && (
          <div className={`info-attack-container ${isFullArt ? 'full-art' : ''}`}>
            <div className="info-attack-container2">
              <div className="energy-icons">
                {cardData.attack?.energyTypes?.map((energy, index) =>
                  Array.from({ length: energy.quantity }).map((_, iconIndex) => (
                    <img
                      key={`${index}-${iconIndex}`}
                      src={`/images/${energy.type.toLowerCase()}.png`}
                      alt={energy.type}
                      className="energy-icon"
                    />
                  ))
                )}
              </div>
              <div className="nom-attaque">
                <div className="titre-attack">
                  <span>{cardData.attack.name}</span>
                </div>
                <div className="attack-details">
                  <span>{cardData.attack.damage}</span>
                </div>
              </div>
            </div>
            <div className="attack-info">
              <span>{cardData.attack.info}</span>
            </div>
          </div>
        )}
      </div>
      <div className="control-buttons">
        <button onClick={downloadCardAsImage}>Télécharger la carte</button>
      </div>
    </div>
  );
};

export default CardPreview;
