import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import { Cards } from './Cards';
import Button from './components/Button';

const SettingsPage = () => {
  const location = useLocation();
  const { initialSelectedCards } = location.state || { initialSelectedCards: Array(Cards.length).fill(false) };

  const { delaySeconds, setDelaySeconds, audioSpeed, setAudioSpeed, backgroundVolume, setBackgroundVolume } = useContext(AppContext);
  const [settings, setSettings] = useState({ delay: delaySeconds, speed: audioSpeed, backgroundVolume: backgroundVolume });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value
    }));
  };

  const handleSave = () => {
    setDelaySeconds(parseInt(settings.delay, 10));
    setAudioSpeed(parseInt(settings.speed, 10));
    setBackgroundVolume(parseInt(settings.backgroundVolume, 10));
    navigate('/main', { state: { initialSelectedCards: initialSelectedCards } });
  };

  return (
    <div>
      <h1>הגדרות</h1>
      <div className="input-container">
        <label className="input-label">זמן השהייה:</label>
        <input
          name="delay"
          type="number"
          value={settings.delay}
          onChange={handleChange}
          className="input-box"
          min={0}
        />
        
        <label className="input-label">מהירות הקראה:</label>
        <input
          name="speed"
          type="number"
          value={settings.speed}
          onChange={handleChange}
          className="input-box"
        />

        <label className="input-label">ווליום רקע:</label>
        <input
          name="backgroundVolume"
          type="number"
          value={settings.backgroundVolume}
          onChange={handleChange}
          className="input-box"
          max={10}
          min={0}
        />
      </div>
      <Button onClick={handleSave}>שמור</Button>
    </div>
  );
};

export default SettingsPage;
