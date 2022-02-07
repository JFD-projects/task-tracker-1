import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {logOut} from "../../redux/reducers/authReducer";
import {useNavigate} from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logOut())
    navigate('/login')
  }, [])

  return <h1>Loading...</h1>;
};

export default Logout;
