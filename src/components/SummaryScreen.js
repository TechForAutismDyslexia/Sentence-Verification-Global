import React from 'react';

const SummaryScreen = ({ totalAttempts, totalElapsedTime, handlePlayAgain }) => {
  const minutes = Math.floor(totalElapsedTime / 60000);
  const seconds = ((totalElapsedTime % 60000) / 1000).toFixed(0);

  return (
    <div className="summary-screen" style={{
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat'
    }}>
      <h1 className="summary-heading" style={{ textAlign: 'center', fontFamily: 'fantasy' }}>Sentence Verification Global</h1>
      <h3 className="summary-heading" style={{ textAlign: 'center', fontFamily:'sans-serif', textDecoration: 'UnderLine', fontWeight:'bold'}}>Session-1 Stats</h3>

      <div className="summary-details" style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Total Attempts: {totalAttempts}</p>
        <p>Time Taken: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes</p>
        <button onClick={handlePlayAgain} className="play-again-button">Play Again</button>
      </div>
    </div>
  );
};

export default SummaryScreen;
