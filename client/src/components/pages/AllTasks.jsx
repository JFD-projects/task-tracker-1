import React from 'react';
import '../../css/common.scss'
import Loader from "react-loader-spinner";
import {useSelector} from "react-redux";
import {getMergedData} from "../../redux/reducers/tasksReducer";
import Tasks from "../UI/Tasks/Tasks";

const AllTasks = () => {
  const isLoadingTasks = useSelector(state => state.lists.isLoading.fetchTasks)
  const mergedData = useSelector(getMergedData())
  if (!mergedData.length) {
    return <h2 className="emptyTasks">Добавьте категорию, чтобы начать работать с задачами</h2>
  }
  return (
    isLoadingTasks ?
      <Loader className="todo__loader" type="ThreeDots" color="#00BFFF" height={80} width={80}/>
      :
      mergedData && mergedData.map(list => (
        <Tasks key={list._id}
               list={list}/>
      ))
  );
};

export default AllTasks;
