import React, { useState, useEffect } from 'react';
import gameData from './gameData.json';
import Confetti from 'react-confetti';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Game() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [shuffledData, setShuffledData] = useState([]);
  const [attempts, setAttempts] = useState(0); // State for tracking attempts
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pausedDuration, setPausedDuration] = useState(0); // State for tracking paused duration
  const [pauseStartTime, setPauseStartTime] = useState(null); // State for tracking when pause started
  const [showNextButton, setShowNextButton] = useState(false); // State for controlling Next button visibility
  const [currentScreen, setCurrentScreen] = useState(1); // Initial screen
  const totalScreens = shuffledData.length;

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
  };

  // Shuffle game data on component mount
  useEffect(() => {
    const shuffleData = () => {
      const shuffled = gameData.map(item => {
        const shuffledImages = shuffleArray(item.images);
        return { ...item, images: shuffledImages };
      });
      setShuffledData(shuffled);
    };
    shuffleData();
    setStartTime(Date.now()); // Start the timer when the component mounts
  }, []);

  // Reset game state when moving to the next level
  useEffect(() => {
    setSelectedImage(null);
    setBackgroundColors([]);
    setModalVisible(false);
    setShowConfetti(false);
  }, [currentLevel]);

  // Update elapsed time every second
  useEffect(() => {
    let interval;
    if (startTime !== null && !modalVisible) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime - pausedDuration;
        setElapsedTime(elapsed >= 0 ? elapsed : 0); // Prevent negative values
      }, 1000);
    } else if (modalVisible) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startTime, modalVisible, pausedDuration]);

  // Handle pausing and resuming the timer
  useEffect(() => {
    if (modalVisible && pauseStartTime === null) {
      setPauseStartTime(Date.now());
    } else if (!modalVisible && pauseStartTime !== null) {
      setPausedDuration(pausedDuration + (Date.now() - pauseStartTime));
      setPauseStartTime(null);
    }
  }, [modalVisible]);

  // Function to read out text using the Web Speech API
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  

  const handleChoice = (chosenImage, index) => {
    setAttempts(attempts + 1); // Increment attempts on each image click
    const correctAnswer = shuffledData[currentLevel].correctAnswer;
    if (chosenImage === correctAnswer && currentLevel !== shuffledData.length - 1) {
      setModalContent('');
      setShowNextButton(true); // Activate the "Next" button in the modal
      setShowConfetti(true);
      const newBackgroundColors = shuffledData[currentLevel].images.map((_, i) =>
        i === correctAnswer ? 'green' : 'transparent'
      );
      setBackgroundColors(newBackgroundColors);
    } else if (chosenImage === correctAnswer && currentLevel === shuffledData.length - 1) {
      const totalAttempts = attempts;
      const totalElapsedTime = elapsedTime;
      setModalContent(
        <div style={{ fontWeight: 'bold', fontFamily: 'Segeto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="modal-style">
            <h2>You have completed all levels!</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className='style-container' style={{ color: 'black', marginBottom: '10px' }}>
                <h4>Attempts</h4>
                <h2 style={{ color: 'black', margin: 0 }}>{totalAttempts}</h2>
              </div>
              <div className='style-container' style={{ color: 'black', marginBottom: '10px' }}>
                <h4>Time(sec)</h4>
                <h2 style={{ color: 'black', margin: 0 }}>{Math.floor(totalElapsedTime / 1000)}</h2>
              </div>
            </div>
            <div className='style-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={`${process.env.PUBLIC_URL}/images/medal.gif`} alt="medal" style={{ width: '200px', height: '200px' }} />
            </div>
          </div>
        </div>
      );

      setShowNextButton(false); // Deactivate the "Next" button in the modal
      setModalVisible(true);
      setShowConfetti(true);
      const newBackgroundColors = shuffledData[currentLevel].images.map((_, i) =>
        i === correctAnswer ? 'green' : 'transparent'
      );
      setBackgroundColors(newBackgroundColors);
    } else {
      const newBackgroundColors = shuffledData[currentLevel].images.map((_, i) =>
        i === index ? 'red' : 'transparent'
      );
      setBackgroundColors(newBackgroundColors);
      setModalContent('.');
      setShowNextButton(false); // Deactivate the "Next" button in the modal
    }
    setSelectedImage(chosenImage);
    setModalVisible(true);
  };

  const handleNextLevel = () => {
    if (selectedImage === null) {
      setModalContent('Please select an image before proceeding to the next level.');
      setModalVisible(true);
      return;
    }
    if (currentScreen < totalScreens) {
      setCurrentScreen(currentScreen + 1);
    }
    if (currentLevel + 1 < shuffledData.length) {
      setCurrentLevel(currentLevel + 1);
      // Reset the game state for the next level
      setSelectedImage(null);
      setBackgroundColors([]);
      setModalVisible(false);
      setShowConfetti(false);
    }
  };

  const handleNextButtonClick = () => {
    handleNextLevel();
  };

  const handlePlayAgain = () => {
    setCurrentLevel(0); // Reset current level to the first level
    setSelectedImage(null); // Reset selected image
    setBackgroundColors([]); // Reset background colors
    setModalVisible(false); // Hide the modal
    setShowConfetti(false); // Hide confetti
    setAttempts(0); // Reset attempts
    setStartTime(Date.now()); // Reset start time for the timer
    setElapsedTime(0); // Reset elapsed time
    setPausedDuration(0); // Reset paused duration
  };

  const handleTryAgain = () => {
    // Reset game state for the current level
    setSelectedImage(null);
    setBackgroundColors([]);
    setModalVisible(false);
  };

  const progressPercentage = (currentScreen / totalScreens) * 100;

  return (
    <div className="game-container" style={{ position: 'relative', backgroundImage: `url(./images/background.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar attempts={attempts} elapsedTime={elapsedTime} currentScreen={currentScreen} totalScreens={totalScreens} />
      {showConfetti && <Confetti />}

      {shuffledData.length > 0 && (
        <>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>

          <div className="transparent-box">
            <img
              src={`${process.env.PUBLIC_URL}/images/audio-icon.png`}
              alt="audio icon"
              onClick={() => speakText(shuffledData[currentLevel].sentence)}
              style={{ width: '30px', height: '30px', cursor: 'pointer', marginLeft: '10px' }}
            />

            <div className="sentence" style={{ textAlign: 'center', fontSize: '24px', fontFamily: 'fantasy', width: '100%' }}>
              {shuffledData[currentLevel].sentence}
            </div>
          </div>
          <div className="images-outer-container">
          <div className="images-container" style={{ display: 'flex', justifyContent: 'center' }}>
            {shuffledData[currentLevel].images.map((image, index) => (
              <div key={index} className="image-wrapper" style={{ backgroundColor: backgroundColors[index] }}>
                <img
                  src={`./images/screen_${shuffledData[currentLevel].screen}_imgs/${image}`}
                  alt={`Image ${index + 1}`}
                  style={{ width: '300px', height: '500px', cursor: 'pointer' }}
                  onClick={() => handleChoice(image, index)}
                />
              </div>
            ))}
          </div>
          </div>
      
          {/* Next button */}
         
          {/* Modal */}
          {modalVisible && (
            <div className="modal-container">
              <div className="modal-overlay"></div>
              <div className="modal-content">
                <p>{modalContent}</p>
                {modalContent === '' && (
                  <>
                    <h4>Correct..! You have chosen the right image</h4>
                    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <img src={`${process.env.PUBLIC_URL}/images/approved.png`} alt="Right choice" style={{ width: '200px', height: '200px' }} />
                    </div>
                    <button onClick={handleNextButtonClick}>Next</button>
                  </>
                )}
                {modalContent === '.' && (
                  <div>
                    <h4>Incorrect..! Try again..</h4>
                    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <img src={`${process.env.PUBLIC_URL}/images/cancel.png`} alt="Wrong choice" style={{
                        width: '200px', height: '200px', justifyContent: 'center'
                      }} />
                    </div>
                    <button onClick={handleTryAgain}>Try Again</button>
                  </div>
                )}
                {(currentLevel === shuffledData.length - 1 && showConfetti) && (
                  <Link to="/">
                    <button
                      onClick={handlePlayAgain}
                      className="play-again-button" // Apply the CSS class
                    >
                      Play Again
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Game;

