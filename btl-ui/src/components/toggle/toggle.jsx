import React from 'react';
import '../../styles/toggle/toggle.css';
import { iconBlock } from "../../assets";



export function Toggle(props) {
  const {
      label,
      name,
      disabled = false,
      onChange,
      value,
  } = props;


  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
    }
  };

  const iconStyles = {
    cursor: disabled ? `url(${iconBlock}), not-allowed` : 'pointer',
  };

  return (
      <div className={`toggle ${value ? 'checked' : ''} ${value ? 'focus' : ''} ${disabled ? 'disabled' : ''}`}  >
        <label className={`switchs ${disabled ? 'disabled' : ''}`} style={iconStyles}>
          <input 
            type='checkbox' 
            name={name}
            checked={value} 
            onChange={onChange}  
            disabled={disabled} 
            id={`checkbox-${label}`} 
          />
          <div className="slider"></div>
        </label>
          <label 
            className={`label ${disabled ? 'disabled' : ''}`} 
            htmlFor={`checkbox-${label}`}
            disabled={disabled} 
            onClick={handleClick}
            style={iconStyles}
          >{label} </label>
      </div>
  );
}