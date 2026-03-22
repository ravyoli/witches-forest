import React from 'react';
import './Card.css';

const Card = ({ image, name, isSelected, onClick }) => {
  return (
    <div className={`card ${isSelected ? 'selected' : 'deselected'}`} onClick={onClick}>
        <div className="card-name">{name}</div>
        <img src={image} alt="Card" /> 
    </div>
  );
};

export default Card;