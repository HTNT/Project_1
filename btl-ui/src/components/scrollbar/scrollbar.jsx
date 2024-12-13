import React from 'react';
import '../../styles/scrollbar/scrollbar.css';


const sizeElement = {
    small: {
      fontSize: 'variant-body-12-medium',
    },
    medium: {
      fontSize: 'variant-body-14-bold',
    },
    large: {
      fontSize: 'variant-title-16-bold',
    },
  };
  
  export function Scrollbar(props) {
    const { size = 'small' } = props;
  
    const scrollbarStyles = {
      maxHeight: '200px',
    };
  
    return (
      <div className={`scrollbar ${size}`} style={{ ...scrollbarStyles, sizeElement }}>
        <div className="scroll-content">
          {Array.from({ length: 20 }, (_, index) => (
            <div key={index + 1} className="content-item">
              {`Item ${index + 1}`}
            </div>
          ))}
        </div>
      </div>
    );
}