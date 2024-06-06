import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LandscapeModal from './LandscapeModal';
import './StartingScreen.css';

// Function to handle orientation lock
const lockOrientation = async () => {
  try {
    // eslint-disable-next-line no-restricted-globals
    if (screen.orientation && screen.orientation.lock) {
      // eslint-disable-next-line no-restricted-globals
      await screen.orientation.lock("landscape");
      console.log("Orientation locked to landscape");
      return true;
    } else {
      alert("Orientation lock is not supported on this device.");
      return false;
    }
  } catch (error) {
    console.error("Error locking orientation:", error);
    return false;
  }
};

function StartingScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Show the modal on small devices
    if (window.innerWidth < 576) {
      setModalVisible(true);
    }
  }, []);

  const handleSwitchToLandscape = async () => {
    const locked = await lockOrientation();
    if (locked) {
      setModalVisible(false);
    }
  };

  return (
    <div
      className="starting-screen"
      style={{
        backgroundImage: `url(/images/startscreen.png)`,
        backgroundSize: 'contain',
        backgroundPosition: 'center'
      }}
    >
      {isModalVisible && <LandscapeModal onSwitchToLandscape={handleSwitchToLandscape} />}
      <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/game">
          <button className="play-button">Play Game</button>
        </Link>
        <p style={{ color: 'red' }}>Please use on PC</p>
      </div>
    </div>
  );
}

export default StartingScreen;
