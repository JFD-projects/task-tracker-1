import React from 'react';
import '../../css/common.scss'

const TextField = ({label, error, type = 'text', name, value, onChange, placeholder}) => {
  return (
    <div className="field__container">
      {label && <label htmlFor={name}>{label}</label>}
      <input className="field__input"
             type={type}
             name={name}
             value={value || ""}
             onChange={({target}) => onChange({name: target.name, value: target.value})}
             placeholder={placeholder}/>
      <p className="field__error">{error}</p>
    </div>

  );
};

export default TextField;
