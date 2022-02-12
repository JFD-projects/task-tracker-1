import React, {useState} from 'react';
import LoginForm from "../forms/LoginForm";
import Button from "../common/Button";
import RegisterForm from "../forms/RegisterForm";

const Login = () => {
  const [typeForm, setTypeForm] = useState('login')
  const toggleFormType = () => {
    setTypeForm(prevState => prevState === 'login' ? 'register' : 'login')
  }
  return (
    <div className="todo__login">
      <div className="todo__login-container">
        {
          typeForm === 'login'
            ?
            <>
              <h2>Login</h2>
              <LoginForm/>
              <div className="todo__login-toggleForm">
                <p>Don't have account?</p>
                <Button onClick={toggleFormType} name='Sign up'/>
              </div>
            </>
            :
            <>
              <h2>Registration</h2>
              <RegisterForm/>
              <div className="todo__login-toggleForm">
                <p>Already have account?</p>
                <Button onClick={toggleFormType} name='Sign in'/>
              </div>
            </>
        }
      </div>
    </div>
  )
};

export default Login;
