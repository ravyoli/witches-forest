import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import MainPage from './MainPage';
import GamePage from './GamePage';
import SettingsPage from './SettingsPage';
import './App.css';
import { AppProvider } from './AppContext';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;