import React from 'react';

const ImageGrid = ({ images, screen, backgroundColors, handleChoice, shadowColor = '#0076a3', shadowOffset = { x: 6, y: 5 }, shadowRadius = 4 }) => {
  return (
      <div className="images-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {images.map((image, index) => (
          <div key={index} className="image-wrapper" style={{ backgroundColor: backgroundColors[index], width: '150px', height: '200px', borderRadius: '15px', overflow: 'hidden', boxShadow: `${shadowOffset.x}px ${shadowOffset.y}px ${shadowRadius}px ${shadowColor}` }}>
            <img
              src={`./images/screen_${screen}_imgs/${image}`}
              alt={`Image ${index + 1}`}
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
              onClick={() => handleChoice(image, index)}
            />
          </div>
        ))}
      </div>
  );
};

export default ImageGrid;
