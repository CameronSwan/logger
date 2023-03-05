import React, { useState } from 'react';

const Checkbox = ({ id, label, value, onChange, className }) => {
  return (
    <div className={className}>
      <input 
        id={id} 
        type="checkbox" 
        checked={value} 
        onChange={onChange} 
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;