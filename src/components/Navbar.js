import { useState, useEffect } from "react";
import { Tooltip } from "bootstrap";
import audio_icon from "../assets/images/audio-icon.png"

export default function Navbar({ currentScreen, totalScreens }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const instructionsText = "Choose the image that best matches the passage.";

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };
    

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    // eslint-disable-next-line
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );
  }, []);

  return (
    <div className=" p-3 shadow-lg">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="text-black m-0">
          Screens:{" "}
          <span className="fw-bold">
            {currentScreen}/{totalScreens}
          </span>
        </h5>

        <h1 className="text-center text-black fw-bold mb-0">
          Sentence Verification Global
        </h1>

        <div className="d-flex align-items-center">
          <button
            onClick={() => speakText("Choose the image that best matches the passage.")}
            onTouchMove={toggleInstructions}
            className="btn btn-light border border-black me-2"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="Choose the image that best matches the passage."
          >
            Instructions
            <img src={audio_icon} alt="audio_icon" style={{
              width: '20px',
              height: '20px',
              cursor: 'pointer',
              marginLeft: '0.5vw',
              borderRadius: '50%'
            }}/>

          </button>
        </div>
      </div>
    </div>
  );
}
