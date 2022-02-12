import React, {useEffect} from 'react';
import TextField from "../common/TextField";
import {useDispatch, useSelector} from "react-redux";
import {getError, signIn} from "../../redux/reducers/authReducer";
import {toast} from "react-toastify";
import Button from "../common/Button";
import {useForm} from "../hooks/useForm";

const LoginForm = () => {
  const {form, handleChange} = useForm({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const loginError = useSelector(getError())

  useEffect(() => {
    if (loginError) {
      toast(loginError)
    }
  }, [loginError])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signIn(form))
  }

  return (
    <form className="form__container" onSubmit={handleSubmit}>
      <TextField label="Электронная почта"
                 value={form.email}
                 onChange={handleChange}
                 name="email"/>
      <TextField label="Пароль"
                 value={form.password}
                 onChange={handleChange}
                 name="password"
                 type="password"/>
      <Button disabled={!form.email || !form.password } name="Отправить"/>
    </form>
  );
};
export default LoginForm;
