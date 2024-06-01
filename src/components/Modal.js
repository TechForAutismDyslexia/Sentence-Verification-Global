// // Modal.js
// import React from 'react';

// function Modal({ modalVisible, modalContent, handleNextButtonClick, handleTryAgain, handlePlayAgain, showConfetti, currentLevel, shuffledData }) {
//   return (
//     modalVisible && (
//       <div className="modal-container">
//         <div className="modal-overlay"></div>
//         <div className="modal-content">
//           <p>{modalContent}</p>
//           {modalContent === '' && (
//             <>
//               <h4>Correct..! You have chosen the right image</h4>
//               <div style={{ justifyContent: 'center', alignItems: 'center' }}>
//                 <img src={`${process.env.PUBLIC_URL}/approved.png`} alt="Right choice" style={{ width: '200px', height: '200px' }} />
//               </div>
//               <button onClick={handleNextButtonClick}>Next</button>
//             </>
//           )}
//           {modalContent === '.' && (
//             <div>
//               <h4>Incorrect..! Try again..</h4>
//               <div style={{ justifyContent: 'center', alignItems: 'center' }}>
//                 <img src={`${process.env.PUBLIC_URL}/cancel.png`} alt="Wrong choice" style={{ width: '200px', height: '200px', justifyContent: 'center' }} />
//               </div>
//               <button onClick={handleTryAgain}>Try Again</button>
//             </div>
//           )}
//           {(currentLevel === shuffledData.length - 1 && showConfetti) && (
//             <button
//               onClick={handlePlayAgain}
//               className="play-again-button"
//             >
//               Play Again
//             </button>
//           )}
//         </div>
//       </div>
//     )
//   );
// }

// export default Modal;
