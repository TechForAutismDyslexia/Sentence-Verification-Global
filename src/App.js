import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router basename='/games/sentenceverification1'>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;