import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Loader from "react-loader-spinner";
import {ToastContainer, Zoom} from "react-toastify";
import {useHistory, useLocation} from "react-router-dom";
import {fetchLists, listsActions} from "../../redux/reducers/listsReducer";
import {fetchTasks} from "../../redux/reducers/tasksReducer";

const AppLoader = ({children}) => {
  const dispatch = useDispatch()
  const isLoadingLists = useSelector(state => state.lists.isLoading.fetchLists)
  const lists = useSelector(state => state.lists.lists)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchLists())
    dispatch(fetchTasks())
    dispatch(listsActions.setActiveList({id: 'all_tasks'}))
  }, [])

  useEffect(() => {
    const page = location.pathname.split("/")
    if (page[1] === 'statistics') {
      return dispatch(listsActions.setActiveList({id: 'statistics'}))
    }
    if (page[1] === 'lists') {
      const list = lists.find(list => list.id === +page[2]);
      return list ? dispatch(listsActions.setActiveList(list)) : history.push(`/`)
    }
    if (page[1] === 'task') {
      return dispatch(listsActions.setActiveList({id: 'task'}))
    } else {
      return dispatch(listsActions.setActiveList({id: 'all_tasks'}))
    }
  }, [lists, location.pathname])

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
