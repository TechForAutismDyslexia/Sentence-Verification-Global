import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './App.css'
import reportWebVitals from './reportWebVitals.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter basename="/games/sentenceverification1">
   <Routes>
  
      <Route path="/" element={<App />}></Route>
   </Routes>
    </BrowserRouter>
      </React.StrictMode>
);


reportWebVitals();
