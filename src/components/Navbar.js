// import React, { useState } from 'react';
// import AudioIcon from './AudioIcon'; // Adjust the path as needed

// export default function Navbar({ currentScreen, totalScreens }) {
//   const [showInstructions, setShowInstructions] = useState(false);
//   const instructionsText = "Choose the image that best matches the passage."; // Replace with your actual instructions

//   const toggleInstructions = () => {
//     setShowInstructions(!showInstructions);
//   };

//   return (
//     <div className='navbar-main'>
//       <h1>SENTENCE   VERIFICATION -  GLOBAL</h1>
//       <div className="navbar-screens" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div style={{ flex: '1' }}>
//           <h5 style={{ margin: 0, textAlign: 'center' }}>Screens: <span>{currentScreen}/{totalScreens}</span></h5>
//         </div>
//         <div className="instructions-container" style={{ flex: '1', textAlign: 'right' }}>
//           <button onClick={toggleInstructions} className="instructions-button">Instructions</button>
//           {showInstructions && (
//             <div className="instructions-dropdown">
//               <p>{instructionsText}</p>
//               {/* Add more instructions as needed */}
//             </div>
//           )}
//           <AudioIcon sentence={instructionsText} />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import AudioIcon from './AudioIcon';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

export default function Navbar({ currentScreen, totalScreens }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const instructionsText = "Choose the image that best matches the passage.";

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);  
  };

  return (
    <div style={{backgroundColor:"white"}}>
      <h1 className="heading" style={{textAlign:'center'}}>SENTENCE VERIFICATION - GLOBAL</h1>
      <div className="navbar-screens d-flex justify-content-between align-items-center w-100">
        <div>
          <h5 style={{color:"black"}}>Screens: <span>{currentScreen}/{totalScreens}</span></h5>
        </div>
        <div className="instructions-container position-relative">
          <button onClick={toggleInstructions} className="instructions-button btn btn-primary btn-sm mx-3">Instructions</button>
          {showInstructions && (
            <div className="instructions-dropdown p-3 bg-white text-dark rounded">
              <p>{instructionsText}</p>
            </div>
          )}
          <AudioIcon sentence={instructionsText} />
        </div>
      </div>
    </div>
  );
}
