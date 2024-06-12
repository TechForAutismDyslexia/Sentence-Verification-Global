import React, { useState } from 'react';
import AudioIcon from './AudioIcon'; // Adjust the path as needed

export default function Navbar({ currentScreen, totalScreens }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const instructionsText = "Choose the image that best matches the passage."; // Replace with your actual instructions

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className='navbar-main'>
      <h1>SENTENCE   VERIFICATION -  GLOBAL</h1>
      <div className="navbar-screens" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: '1' }}>
          <h5 style={{ margin: 0, textAlign: 'center' }}>Screens: <span>{currentScreen}/{totalScreens}</span></h5>
        </div>
        <div className="instructions-container" style={{ flex: '1', textAlign: 'right' }}>
          <button onClick={toggleInstructions} className="instructions-button">Instructions</button>
          {showInstructions && (
            <div className="instructions-dropdown">
              <p>{instructionsText}</p>
              {/* Add more instructions as needed */}
            </div>
          )}
          <AudioIcon sentence={instructionsText} />
        </div>
      </div>
    </div>
  );
}