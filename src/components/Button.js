import React from 'react';
import './Button.css';

const Button = ({ onClick, children }) => (
  <button className="custom-button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
