import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Button from './components/Button';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Actions from './Actions';
import Card from './Card';
import { Cards } from './Cards';
import { AppContext } from './AppContext';

const GamePage = () => {
  const { delaySeconds, audioSpeed, backgroundVolume } = useContext(AppContext);

  const location = useLocation();

  const { selectedCards, initialSelectedCards } = location.state || { 
    selectedCards: [],
    initialSelectedCards: Array(Cards.length).fill(false)
   };
  const [currentAction, setCurrentAction] = useState();
  const [isStarted, setStarted] = useState(false);
  const [currentDelaySeconds, setCurrentDelaySeconds] = useState(5);

  const executeActions = async (actions, signal, abortController) => {
    if (currentAction != null) {
      // continue from currentAction
      for (let i = 0; i < actions.length; ++i) {
        if (actions[i] === currentAction) {
          actions.splice(0, i);
          break;
        }
      }
    }
    for (const action of actions) {
      if (signal.aborted) {
        break;
      }
      setCurrentAction(action);
      if (action.type === 'sound') {
        await playSound(action.clip, signal);
      } else if (action.type === 'const_wait') {
        await delay(action.seconds, signal);
      } else if (action.type === 'wait') {
        await delay(delaySeconds, signal);
      }
    }
    setCurrentAction(null);
    abortController.abort('finished');
  };

  const playSound = (file, signal, volume = 1, loop = false, changeSpeed = true) => {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) return reject(new Error('Aborted'));
      const audio = new Audio(file);
      audio.volume = volume;
      audio.loop = loop;
      if (changeSpeed) {
        audio.playbackRate = audioSpeed / 100.0;
      }
      audio.play();
      audio.onended = resolve;

      signal?.addEventListener('abort', () => {
        audio.pause();
        audio.currentTime = 0;
        reject(new Error('Aborted'));
      });
    });
  };

  const delay = (seconds, signal) => {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) return reject(new Error('Aborted'));
      setCurrentDelaySeconds(seconds);
      const updateRemainingTimeId = setInterval(() => {
        setCurrentDelaySeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            clearInterval(updateRemainingTimeId);
          }
          return prevSeconds - 1;
        });
      }, 1000);
      const timeoutId = setTimeout(() => {
        clearInterval(updateRemainingTimeId);
        resolve();
      }, seconds * 1000);
      signal?.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        clearInterval(updateRemainingTimeId);
        reject(new Error('Aborted'));
      });
    });
  };

  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/main', { state: { initialSelectedCards: initialSelectedCards } });
  }

  const handleWait = () => {
    setStarted(!isStarted);
  }


  useEffect(() => {
    // Automatically set started to true on page load
    setStarted(true);
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (isStarted) {
      playSound('background1.m4a', signal, 0.1 * backgroundVolume, true, false).catch(err => { });
      const actions = Actions.filter(action => !action.card || selectedCards.some(card => card.type == action.card));
      executeActions(actions, signal, abortController).catch(err => {
        if (err.message === 'Aborted') {
          console.log('Actions were aborted');
        }
      });
    }

    // Cleanup function to abort actions when the component unmounts or when `started` changes
    return () => {
      abortController.abort();
    };
  }, [isStarted, selectedCards]);

  let currentCards = null;
  if (currentAction?.card != null) {
    currentCards = <div className='playing-cards'>
      {selectedCards.filter(card => card.type === currentAction?.card).map((c, idx) =>
        <Card
          key={idx}
          image={c.image}
          name={c.name}
          isSelected={true} />
      )}
    </div>;
  }

  let text = currentAction?.text;
  if (currentAction?.type === 'wait' || currentAction?.type === 'const_wait') {
    text = `השהייה ל ${currentDelaySeconds} שניות`;
  }

  return (
    <div className="App">
      {currentCards}
      <p>{text}</p>
      <div className='buttons-container'>
        <Button onClick={handleWait}>
          {!isStarted ? 'בוא נמשיך' : 'חכה רגע'}
        </Button>
        <Button onClick={handleGoHome}>
          מסך ראשי
        </Button>

      </div>
    </div>
  );
};

export default GamePage;
