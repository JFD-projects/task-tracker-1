import React from "react";

const SelectField = ({
                       value,
                       onChange,
                       options,
                       name,
                       defaultOption
                     }) => {
  const handleChange = ({target}) => {
    onChange({name: target.name, value: target.value});
  };

  return (
    <div className="select-wrapper">
      <select
        className="select"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled selected hidden value="">
          {defaultOption}
        </option>
        {options &&
        options.map((option) => (
          <option key={`category-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
