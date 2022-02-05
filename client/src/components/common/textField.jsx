import React from 'react';
import '../../css/common.scss'

const TextField = ({name, value, onChange, placeholder}) => {
  return (
    <input className="field"
           type="text"
           name={name}
           value={value || ""}
           onChange={({target}) => onChange({name: target.name, value: target.value})}
           placeholder={placeholder}/>
  );
};

export default TextField;
