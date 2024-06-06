import React from 'react';
import { Link } from 'react-router-dom';
import './StartingScreen.css'; // Import the CSS file

function StartingScreen() {
  return (
    <div
      className="starting-screen"
      style={{
        backgroundImage: `url(/images/startscreen.png)`,
        backgroundSize: 'contain', // Changed to cover for full background
        backgroundPosition: 'center'
      }}
    >
      <div style={{textAlign:'center', justifyContent:'center', alignItems:'center'}}>
        <Link to="/game">
          <button className="play-button">Play Game</button>
        </Link>
        <p style={{color:'red'}}>Please use in Landscape mode</p>
      </div>
    </div>
  );
}

export default StartingScreen;
