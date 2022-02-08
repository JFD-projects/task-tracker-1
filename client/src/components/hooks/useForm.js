import {useState} from "react";

export const useForm = (initialState = {}) => {
  const [form, setForm] = useState(initialState);
  const handleChange = (target) => {
    setForm((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const changeAllForm = (state) => {
    setForm(state)
  }

  return { changeAllField: changeAllForm, handleChange, form}
}