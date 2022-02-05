import {useState} from "react";

export const useForm = (initialState = {}) => {
  const [form, setForm] = useState(initialState);
  const handleChange = (target) => {
    setForm((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const changeAllForm = (fields) => {
    fields.forEach(field => {
      handleChange(field)
    })
  }

  return { changeAllForm, handleChange, form}
}