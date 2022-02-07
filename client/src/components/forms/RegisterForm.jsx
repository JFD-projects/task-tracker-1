import React, {useEffect, useState} from 'react';
import TextField from "../common/textField";
import {useDispatch} from "react-redux";
import {signUp} from "../../redux/reducers/authReducer";
import Button from "../common/Button";
import * as yup from "yup";
import {useForm} from "../hooks/useForm";

const RegisterForm = () => {
  const dispatch = useDispatch()
  const {form , handleChange} = useForm( {
    email: '',
    password: '',
    name: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    validate()
  }, [form])

  const validateScheme = yup.object().shape({
    password: yup.string().required("Пароль обязателен для заполнения")
      .matches(/(?=.*[A-Z])/, "Пароль должен содержать заглавную букву")
      .matches(/(?=.*[0-9])/, "Пароль должен содержать число")
      .matches(/(?=.*[!@#$&^*])/, "Пароль должен содержать один из специальных символов !@#$&^*")
      .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8 символов")
      .matches(/^\S*$/, "Пробелы недопустимы в пароле"),
    name: yup.string()
      .required("Имя обязательно для заполнения")
      .matches(/(?=.{3,})/, "Имя должно состоять минимум из 3 символов"),
    email: yup.string().required("Электронная почта обязательна для заполнения").email("Email введен некорректно")
  })
  const validate = () => {
    validateScheme.validate(form)
      .then(() => setErrors({}))
      .catch((err) => setErrors({[err.path]: err.message}))
    return Object.keys(errors).length === 0
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    dispatch(signUp(form))
  }

  return (
    <form className="form__container" onSubmit={handleSubmit}>
      <TextField label="Электронная почта"
                 value={form.email}
                 onChange={handleChange}
                 error={errors.email}
                 name="email"/>
      <TextField label="Имя"
                 value={form.name}
                 onChange={handleChange}
                 error={errors.name}
                 name="name"/>
      <TextField label="Пароль"
                 value={form.password}
                 onChange={handleChange}
                 name="password"
                 error={errors.password}
                 type="password"/>
      <Button disabled={Object.keys(errors).length !== 0} name="Отправить"/>
    </form>
  );
};

export default RegisterForm;
