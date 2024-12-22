import axios from "axios";
import { useEffect, useRef } from "react";

const SummaryScreen = ({ totalAttempts, totalElapsedTime }) => {
  const timer = Math.floor(totalElapsedTime / 1000);
  const gameId = "10";
  const tries = totalAttempts;
  const status = true;

  const sendData = async () => {
    const res = await axios.post(
      "https://api.joywithlearning.com/api/caretaker/sendgamedata",
      { gameId, tries, timer, status }
    );
    console.log(res);
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    sendData();
  }, []);

  return (
    <div
      className="summary-screen d-flex flex-column justify-content-center align-items-center text-white"
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to bottom right, #6a11cb, #2575fc)",
      }}
    >
      <h1 className="summary-heading text-center display-4 fw-bold text-shadow mb-4">
        Sentence Verification Global
      </h1>

      <h3 className="text-center fw-bold mb-2">
        Tries: <span className="text-warning">{tries}</span>
      </h3>

      <h3 className="text-center fw-bold mb-4">
        Time Elapsed: <span className="text-warning">{timer} seconds</span>
      </h3>

      <h3 className="text-center fw-bold mb-2">🎉 CONGRATULATIONS...!! 🎉</h3>
      <h3 className="text-center fw-bold mb-5">YOU HAVE COMPLETED THE GAME</h3>

      <button
        className="btn btn-light btn-lg px-4 shadow rounded-pill fw-bold"
        style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
        onMouseOver={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 6px 14px rgba(0, 0, 0, 0.3)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
        }}
        onClick={() => {
          window.location.reload();
        }}
      >
        Home Page
      </button>
    </div>
  );
};

export default SummaryScreen;
