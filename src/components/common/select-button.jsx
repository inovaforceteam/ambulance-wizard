"use client";
import React, { useState } from 'react';


const SelectButton = ({ key, value, option, price, handleSelect, selectedType, type,disabled }) => {
  
  const buttonStyle = {
    backgroundColor: selectedType === type ? '#fbf79e' : 'grey',
    color: 'black',
    padding: '5px 20px',
    border: '2px solid #cdca8d',
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    marginTop: '10px',
    fontSize: '16px',
    fontWeight: '600',
    gap: '10px',
    
    
  };

  return (
    <button
      className='mt-4 mb-4'
      style={buttonStyle}
      key={key}
      value={value}
      onClick={() => handleSelect(option)}
      disabled={disabled}
    
    >
      {option}{" - "}{price}
    </button>
  );
};

export default SelectButton;
