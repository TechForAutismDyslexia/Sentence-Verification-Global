// import React from 'react';

// const ImageGrid = ({ images, screen, backgroundColors, handleChoice, shadowColor = '#0076a3', shadowOffset = { x: 6, y: 5 }, shadowRadius = 4 }) => {
//   return (
//       <div className="images-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
//         {images.map((image, index) => (
//           <div key={index} className="image-wrapper" style={{ backgroundColor: backgroundColors[index], width: '150px', height: '200px', borderRadius: '15px', overflow: 'hidden', boxShadow: `${shadowOffset.x}px ${shadowOffset.y}px ${shadowRadius}px ${shadowColor}` }}>
//             <img
//               src={`./images/screen_${screen}_imgs/${image}`}
//               alt={`Image ${index + 1}`}
//               style={{ width: '100%', height: '100%', cursor: 'pointer' }}
//               onClick={() => handleChoice(image, index)}
//             />
//           </div>
//         ))}
//       </div>
//   );
// };

// export default ImageGrid;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const ImageGrid = ({ images, screen, backgroundColors, handleChoice, shadowColor = '#0076a3', shadowOffset = { x: 6, y: 5 }, shadowRadius = 4 }) => {
  return (
    <div className="container">
      <div style={{justifyContent:'center', display:'flex',marginLeft:'12%',marginRight:'10%'}}>
        {images.map((image, index) => (
          <div key={index} className="col-4 col-md-3 mb-3" style={{gap:'30px'}}>
            <div 
              className="image-wrapper" 
              style={{ 
                backgroundColor: backgroundColors[index], 
                boxShadow: `${shadowOffset.x}px ${shadowOffset.y}px ${shadowRadius}px ${shadowColor}`,
                cursor: 'pointer',
                borderRadius: '15px',
                overflow: 'hidden'
              }}
              onClick={() => handleChoice(image, index)}
            >
              <img
                src={`./images/screen_${screen}_imgs/${image}`}
                alt={`Image ${index + 1}`}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
