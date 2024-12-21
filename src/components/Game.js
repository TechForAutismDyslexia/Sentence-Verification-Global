import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProgressBar from "./ProgressBar";
import ImageGrid from "./ImageGrid";
import AudioIcon from "./AudioIcon";
import SummaryScreen from "./SummaryScreen";
import "../App.css";
import Confetti from "react-confetti";
import axios from "axios";

function Game() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [shuffledData, setShuffledData] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const totalScreens = shuffledData.length;
  const [gameCompleted, setGameCompleted] = useState(false);

  const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.joywithlearning.com/api/sentenceverificationglobal/game-data"
        );
        const shuffled = response.data.map((item) => {
          const shuffledImages = shuffleArray(item.images);
          return { ...item, images: shuffledImages };
        });
        setShuffledData(shuffled);
        setStartTime(Date.now());
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFeedbackMessage((prevMsg) => (prevMsg === "Correct" ? "Correct" : ""));
    }, 3000);
  }, [feedbackMessage]);

  useEffect(() => {
    setSelectedImage(null);
    setBackgroundColors([]);
    setShowConfetti(false);
    setFeedbackMessage("");
  }, [currentLevel]);

  useEffect(() => {
    let interval;
    if (startTime !== null) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
        setElapsedTime(elapsed >= 0 ? elapsed : 0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  const handleChoice = (chosenImage, index) => {
    setAttempts(attempts + 1);
    const correctAnswer = shuffledData[currentLevel].correctAnswer;
    if (chosenImage === correctAnswer) {
      setShowConfetti(true);
      setFeedbackMessage("Correct");
      const newBackgroundColors = shuffledData[currentLevel].images.map(
        (_, i) => (i === index ? "green" : "transparent")
      );
      setBackgroundColors(newBackgroundColors);
      setShowNextButton(true);

      if (currentLevel === shuffledData.length - 1) {
        setTimeout(() => {
          setCompletionTime(Date.now() - startTime);
          setGameCompleted(true);
        }, 4000);
      }
    } else {
      setFeedbackMessage("Please, Try Again..");
      const newBackgroundColors = shuffledData[currentLevel].images.map(
        (_, i) => (i === index ? "#d63031" : "transparent")
      );
      setBackgroundColors(newBackgroundColors);
      setTimeout(() => {
        setFeedbackMessage("");
        setBackgroundColors([]);
      }, 2000);
    }
    setSelectedImage(chosenImage);
  };

  const handleNextLevel = () => {
    if (currentLevel + 1 < shuffledData.length) {
      setCurrentLevel(currentLevel + 1);
      setCurrentScreen(currentScreen + 1);
      setSelectedImage(null);
      setBackgroundColors([]);
      setShowConfetti(false);
      setShowNextButton(false);
    }
  };

  const handleNextButtonClick = () => {
    handleNextLevel();
  };

  const handlePlayAgain = () => {
    setCurrentLevel(0);
    setSelectedImage(null);
    setBackgroundColors([]);
    setShowConfetti(false);
    setAttempts(0);
    setStartTime(Date.now());
    setElapsedTime(0);
    setCompletionTime(null);
    setGameCompleted(false);
    setCurrentScreen(1);
    setShowNextButton(false);
  };

  const progressPercentage = (currentScreen / totalScreens) * 100;

  if (gameCompleted) {
    return (
      <SummaryScreen
        totalAttempts={attempts}
        totalElapsedTime={completionTime}
        handlePlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <div
      className="game-container position-relative"
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to bottom right, #a4a6f0, #73aaff)",
      }}
    >
      <Navbar
        attempts={attempts}
        elapsedTime={elapsedTime}
        currentScreen={currentScreen}
        totalScreens={totalScreens}
      />

      {showConfetti && <Confetti />}

      {shuffledData.length > 0 && (
        <>
          <ProgressBar progressPercentage={progressPercentage} />

          <div className="p-3 bg-transparent rounded">
            <AudioIcon sentence={shuffledData[currentLevel].sentence} />
            <div className="text-center fs-4 fw-bold">
              {shuffledData[currentLevel].sentence}
            </div>
          </div>

          <div
            className={`text-center p-3 rounded-3 w-75 shadow-lg mx-auto ${
              feedbackMessage === "Correct"
                ? "bg-success bg-opacity-50"
                : feedbackMessage === "Please, Try Again.."
                ? "bg-danger bg-opacity-50"
                : "bg-transparent"
            }`}
          >
            <ImageGrid
              images={shuffledData[currentLevel].images}
              screen={shuffledData[currentLevel].screen}
              backgroundColors={backgroundColors}
              handleChoice={handleChoice}
            />

            {showNextButton && currentLevel < shuffledData.length - 1 && (
              <div className="text-center mt-3">
                <button
                  onClick={handleNextButtonClick}
                  className="btn btn-primary btn-lg"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
