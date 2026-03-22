import React, { useState, useContext } from 'react';
import Card from './Card';
import './App.css';
import Button from './components/Button';
import { useNavigate } from 'react-router-dom';
import { Cards } from './Cards';
import { useLocation } from 'react-router-dom';

const MainPage = () => {

    const navigate = useNavigate();

    const handleStartGame = () => {
        const selected = Cards.filter((_, index) => selectedCards[index]);
        navigate('/game', { state: { selectedCards: selected, initialSelectedCards: selectedCards } });
      };
    
      const handleSettings = () => {
        navigate('/settings', { state: { initialSelectedCards: selectedCards } });
    };

    const handleCardClick = (index) => {
        console.log(index)
        const updatedSelection = selectedCards.map((isSelected, i) => 
          i === index ? !isSelected : isSelected
        );
        setSelectedCards(updatedSelection);
        
      };

    const location = useLocation();

    const { initialSelectedCards } = location.state || { initialSelectedCards: Array(Cards.length).fill(false) };
    
    const [selectedCards, setSelectedCards] = useState(initialSelectedCards);

    return (
        <>
            <h1>יער המכשפות</h1>
            <div className="grid-container">
                {Cards.map((card, index) => (
                    <Card 
                    key={index} 
                    image={card.image} 
                    name={card.name}
                    isSelected={selectedCards[index]} 
                    onClick={() => handleCardClick(index)}
                    />
                ))}
            </div>
            <div className="buttons-container">
            <Button onClick={handleStartGame}>
                התחל עם {selectedCards.filter(x => x).length} דמויות
            </Button>
            <Button onClick={handleSettings}>
                הגדרות
            </Button>

            </div>
        </>
    );
};

export default MainPage;
