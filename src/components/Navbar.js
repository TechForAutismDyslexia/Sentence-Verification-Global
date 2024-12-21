import { useState, useEffect } from "react";
import AudioIcon from "./AudioIcon";
import { Tooltip } from "bootstrap";

export default function Navbar({ currentScreen, totalScreens }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const instructionsText = "Choose the image that best matches the passage.";

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
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
    <div>
      <div className="pt-3 pb-2 shadow-lg">
        <h1 className="text-center text-black fw-bold mb-3 p-2">
          Sentence Verification Global
        </h1>
        <div className="d-flex justify-content-between align-items-center px-4">
          <div>
            <h5 className="text-black">
              Screens:{" "}
              <span className="fw-bold">
                {currentScreen}/{totalScreens}
              </span>
            </h5>
          </div>

          <div className="d-flex align-items-center">
            <button
              onClick={toggleInstructions}
              className="btn btn-primary  me-2"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-custom-class="custom-tooltip"
              data-bs-title="Choose the image that best matches the passage."
            >
              Instructions
            </button>

            <AudioIcon sentence={instructionsText} />
          </div>
        </div>
      </div>
    </div>
  );
}
