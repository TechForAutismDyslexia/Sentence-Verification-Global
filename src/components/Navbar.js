import React from 'react';

export default function Navbar({ attempts, elapsedTime, currentScreen, totalScreens }) {
  return (
    <div className="full-width-navbar">
      <div className="container-fluid">
        <img src={`${process.env.PUBLIC_URL}/images/logo1.png`} alt="Logo" className="navbar-logo" />
        <div className="screen-info">
          <h5 style={{ margin: 0, display: 'flex', alignItems: 'center',color:'skyblue' }}>
            Screens: <h2 style={{ margin: '0 0 0 8px',color:'white', fontFamily:'serif'}}>{currentScreen}/{totalScreens}</h2>
          </h5>
        </div>
        <div className="other-text-navbar">
          <h3 style={{ color: 'skyblue', fontFamily:'cursive'}}>Attempts: <span style={{ color: 'white' }}>{attempts}</span></h3>
          <h3 style={{ color: 'skyblue',fontFamily:'cursive' }}>Time: <span style={{ color: 'red' }}>{Math.floor(elapsedTime / 1000)}<span style={{ color: 'white' }}> seconds</span></span></h3>
        </div>
      </div>
    </div>
  );
}
