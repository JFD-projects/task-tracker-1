import React from 'react';
import imgList from "../../assets/img/list.svg";
import imgChart from "../../assets/img/line-chart.svg";
import imgTask from "../../assets/img/task.svg";
import {useSelector} from "react-redux";
import {getUser} from "../../redux/reducers/authReducer";
import {SidebarProfile} from "./SidebarProfile";
import {getMergedData} from "../../redux/reducers/tasksReducer";
import List from "../UI/List/List";
import AddListForm from "../forms/AddListForm";

const SideBar = () => {
  const activeList = useSelector(state => state.lists.activeList)
  const user = useSelector(getUser())
  const mergedData = useSelector(getMergedData())

  return (
    <div className="todo__sidebar">
      <SidebarProfile user={user}/>
      <List items={[
        {
          _id: 'all_tasks',
          name: 'Все категории',
          icon: <img src={imgList} alt="List icon"/>
        }]}
            activeList={activeList}
      />
      <List items={mergedData}
            activeList={activeList}
            isRemovable/>
      <AddListForm/>
      <List items={[
        {
          _id: 'statistics',
          name: 'Статистика задач',
          icon: <img src={imgChart} alt="Chart icon"/>
        }]}
            activeList={activeList}
      />
      <List items={[
        {
          _id: 'task',
          name: 'Добавить задачу',
          icon: <img src={imgTask} alt="Task icon"/>
        }]}
            activeList={activeList}
      />
    </div>
  );
};

export default SideBar;
