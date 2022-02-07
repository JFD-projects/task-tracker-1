import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Loader from "react-loader-spinner";
import {ToastContainer, Zoom} from "react-toastify";
import {fetchLists, listsActions} from "../../redux/reducers/listsReducer";
import {fetchTasks} from "../../redux/reducers/tasksReducer";
import {getCurrentUser, getIsLoggedIn} from "../../redux/reducers/authReducer";
import Login from "../pages/Login";
import {useNavigate} from "react-router-dom";
import localStorageService from "../../services/local.storage.service";

const AppLoader = ({children}) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const isLoadingLists = useSelector(state => state.lists.isLoading.fetchLists)
  const navigate = useNavigate()
  const userId = localStorageService.getLocalId()

  useEffect(() => {
    if (isLoggedIn && userId) {
      dispatch(fetchLists())
      dispatch(fetchTasks())
      dispatch(getCurrentUser(userId))
      dispatch(listsActions.setActiveList({_id: 'all_tasks'}))
      navigate('/')
    }
  }, [isLoggedIn])


  if (!isLoggedIn) {
    return <Login/>
  }
  return (
    <div className="todo">
      {isLoadingLists ?
        <Loader className="todo__loader" type="Bars" color="#00BFFF" height={80} width={80}/>
        : children
      }
      <ToastContainer transition={Zoom} autoClose={1500}/>
    </div>
  );
};

export default AppLoader;
