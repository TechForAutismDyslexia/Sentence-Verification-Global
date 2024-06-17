// import React from 'react';

// const ProgressBar = ({ progressPercentage }) => {
//   return (
//     <div className="progress-bar-container">
//       <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
//     </div>
//   );
// };

// export default ProgressBar;



import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const ProgressBar = ({ progressPercentage }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped"
          role="progressbar"
          style={{ width: `${progressPercentage}%` }}
          aria-valuenow={progressPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

