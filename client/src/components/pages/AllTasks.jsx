import React from 'react';
import Loader from "react-loader-spinner";
import {Tasks} from "../index";
import {useSelector} from "react-redux";
import {useMerger} from "../hooks/useMerger";

const AllTasks = () => {
  const isLoadingTasks = useSelector(state => state.lists.isLoading.fetchTasks)
  const lists = useSelector(state => state.lists.lists)
  const tasks = useSelector(state => state.tasks.tasks)
  const mergedData = useMerger(lists, tasks, "tasks", "listId", "id")

  return (
    isLoadingTasks ?
      <Loader className="todo__loader" type="ThreeDots" color="#00BFFF" height={80} width={80}/>
      :
      mergedData && mergedData.map(list => (
        <Tasks key={list.id}
               list={list}/>
      ))
  );
};

export default AllTasks;
