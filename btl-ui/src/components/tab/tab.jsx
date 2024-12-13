
// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import React, { useState } from 'react';


/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import '../../styles/tab/tab.css';
// import { iconStar } from '../../assets';
import { Link } from 'react-router-dom';


const sizeElement = {
  small: {
    fontSize: 'txt-body-12-medium',
    iconSize: {
      width: '16px',
      height: '16px',
    },
  },
  medium: {
    fontSize: 'txt-body-14-bold',
    iconSize: {
      width: '20px',
      height: '20px', 
    },
  },
  large: {
    fontSize: 'txt-title-20-bold',
    iconSize: {
      width: '28px',
      height: '28px',
    },
  },
  giant: {
    fontSize: 'txt-title-20-bold',
    iconSize: {
      width: '28px',
      height: '28px',
    },
  }
};

export function Tab(props) {
  const {
    label,
    size = 'medium', // small | medium | large | giant
    // disabled = false
    iconTab,
    disabled = false, //true | false
    isActive,
    url,
    onClick
  } = props;
  // const [activeTab, setActiveTab] = useState(size);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // const handleTabClick = (clickedSize) => {
  //   setActiveTab(clickedSize);
  // };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <Link to={url} className={`tab-container ${isHovered ? 'hovered' : ''} ${isFocused ? 'focused' : ''} `} onClick={onClick}>
      {/* {['small', 'medium', 'large'].map((tabSize) => ( */}
        <div
          className={`tab-item tab-item-${size} ${sizeElement[size].fontSize} ${isActive && 'active'} ${disabled ? 'disabled' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex="0"
        >
          {iconTab && <div
            className='tab-icon'
            // className={`tab-icon ${sizeElement[size].fontSize} ${activeTab === tabSize ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
            style={{
              ...sizeElement[size].iconSize,
              maskImage: `url(${iconTab})`,
              WebkitMaskImage: `url(${iconTab})`,
            }}
          />}
          <span>{label}</span>
        </div>
      {/* ))} */}
    </Link>
  );
}

