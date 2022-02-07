import React from 'react';
import Loader from "react-loader-spinner";
import {Tasks} from "../index";
import {useSelector} from "react-redux";

const CategoryTasks = () => {
  const isLoadingTasks = useSelector(state => state.lists.isLoading.fetchTasks)
  const activeList = useSelector(state => state.lists.activeList)
  const tasks = useSelector(state => state.tasks.tasks)

  return (
    isLoadingTasks ?
      <Loader className="todo__loader" type="ThreeDots" color="#00BFFF" height={80} width={80}/>
      : activeList &&
      <Tasks tasks={tasks.filter(task => task.listId === activeList._id)}
             withNavigate
             list={activeList}/>

  );
};

export default CategoryTasks;
