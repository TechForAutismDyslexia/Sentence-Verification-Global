import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import './App.css';

function App() {
  return (

        <Routes>
          <Route path="/" element={<Game />} />
        </Routes>
  );
}

export default App;
