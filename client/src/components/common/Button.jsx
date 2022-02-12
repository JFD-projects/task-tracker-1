import React from 'react';

const Button = ({onClick, disabled, name, className = "button"}) => (
  <button disabled={disabled} onClick={onClick} className={className}>{name}</button>
);

export default Button;
